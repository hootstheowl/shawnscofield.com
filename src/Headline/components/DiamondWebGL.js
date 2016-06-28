import React, { Component, PropTypes } from 'react';
import threeJS from 'three-js';
import Projector from 'three-js/addons/Projector';
import CanvasRenderer from 'three-js/addons/CanvasRenderer';
import RenderPass from 'three-js/addons/RenderPass';
import BloomPass from 'three-js/addons/BloomPass';
import ShaderPass from 'three-js/addons/ShaderPass';
import MaskPass from 'three-js/addons/MaskPass';
import CopyShader from 'three-js/addons/CopyShader';
import EffectComposer from 'three-js/addons/EffectComposer';
import ConvolutionShader from 'three-js/addons/ConvolutionShader';
const THREE = threeJS([
  Projector, CanvasRenderer, RenderPass, BloomPass, ShaderPass, CopyShader,
  EffectComposer, ConvolutionShader, MaskPass,
]);

export default class DiamondWebGL extends Component {
  static propTypes = {
    fps: PropTypes.number,
    border: PropTypes.number,
    theta: PropTypes.number,
    radius: PropTypes.number,
    opacity: PropTypes.number,
    count: PropTypes.number,
    palette: PropTypes.array,
  }
  static defaultProps = {
    fps: 30,
    border: 9,
    theta: 0.1,
    radius: 600,
    opacity: 0.1,
    count: 150,
    palette: [
      0x6dd1ff, 0x1b87ff, 0x0f1272, 0xfcd1ff, 0x8536a5, 0x340843, 0x32126a,
    ],
  }
  constructor(props) {
    super(props);
    this.container = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.state = {
      theta: this.props.theta,
      then: Date.now(),
    };
  }
  componentDidMount() {
    this.init();
    this.animate();
  }
  componentDidUpdate(prevProps) {
    if (this.props === prevProps) {
      return;
    }
    this.destroyInstance();
    this.init();
  }
  setFilters() {
    const renderModel = new THREE.RenderPass(this.scene, this.camera);
    const effectBloom = new THREE.BloomPass(4.5, 25, 12, 256);
    const effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.renderTarget1.texture.format = THREE.RGBAFormat;
    this.composer.renderTarget2.texture.format = THREE.RGBAFormat;
    effectBloom.renderTargetX.texture.format = THREE.RGBAFormat;
    effectBloom.renderTargetY.texture.format = THREE.RGBAFormat;
    this.composer.addPass(renderModel);
    this.composer.addPass(effectBloom);
    this.composer.addPass(effectCopy);
  }
  addDiamond() {
    const { palette, opacity } = this.props;
    const diamondColor = palette[Math.floor(
      Math.random() * palette.length
    )];
    const diamond = new THREE.Mesh(
      new THREE.SphereGeometry(2, 4, 2),
      new THREE.MeshBasicMaterial({
        color: diamondColor,
        transparent: true,
        opacity,
      })
    );
    diamond.position.x = this.generatePosition();
    diamond.position.y = this.generatePosition();
    diamond.position.z = this.generatePosition();
    diamond.scale.x = diamond.scale.y = diamond.scale.z = Math.random() * 45;
    this.scene.add(diamond);
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(
      45, (this.windowWidth() / this.windowHeight()), 1, 1000
    );
    this.camera.position.set(0, 300, 500);
    this.scene = new THREE.Scene();
    for (let i = 0; i < this.props.count; i ++) {
      this.addDiamond();
    }
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.windowWidth(), this.windowHeight());
    this.renderer.autoClear = false;
    this.container.appendChild(this.renderer.domElement);
    this.setFilters();
    window.addEventListener('resize', this.handleWindowResize.bind(this), false);
  }
  destroyInstance() {
    this.container.removeChild(this.renderer.domElement);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.loadingManager = null;
  }
  handleWindowResize() {
    this.camera.aspect = this.windowWidth() / this.windowHeight();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.windowWidth(), this.windowHeight());
  }
  windowWidth() {
    return window.innerWidth - this.props.border * 2;
  }
  windowHeight() {
    return window.innerHeight - this.props.border * 2;
  }
  generatePosition() {
    return Math.random() * 800 - 400;
  }
  animate() {
    requestAnimationFrame(
      this.animate.bind(this)
    );
    const interval = 1000 / this.props.fps;
    const now = Date.now();
    const delta = now - this.state.then;
    if (delta > interval) {
      this.setState({
        then: now - (delta % interval),
        theta: this.state.theta + 0.1,
      }, () => {
        this.renderScene();
      });
    }
  }
  renderScene() {
    const { radius } = this.props;
    const { theta } = this.state;
    this.camera.position.x = radius * Math.sin(
      THREE.Math.degToRad(theta)
    );
    this.camera.position.y = radius * Math.sin(
      THREE.Math.degToRad(theta)
    );
    this.camera.position.z = radius * Math.cos(
      THREE.Math.degToRad(theta)
    );
    this.camera.lookAt(this.scene.position);
    this.camera.updateMatrixWorld();
    this.renderer.clear();
    this.composer.render();
  }
  render() {
    return (
      <div
        className="headline-canvas"
        ref={ref => {
          this.container = ref;
        }}
      />
    );
  }
}
