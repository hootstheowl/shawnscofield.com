import Nerv, { Component } from 'nervjs';
import PropTypes from 'prop-types';
import { THREE, AXES } from '../constants';
import { getWindowHeight, getWindowWidth, generatePosition } from '../helpers';

export default class DiamondBackground extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.state = {
      theta: props.speed,
      then: Date.now(),
    };
  }

  componentDidMount() {
    this.createInstance();
    this.animateInstance();
  }

  componentWillUnmount() {
    this.stopInstance();
    this.destroyInstance();
  }

  setComposer(filterPass) {
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.renderTarget1.texture.format = THREE.RGBAFormat;
    this.composer.renderTarget2.texture.format = THREE.RGBAFormat;
    if (Array.isArray(filterPass)) {
      filterPass.forEach(pass => this.composer.addPass(pass));
    } else {
      this.composer.addPass(filterPass);
    }
  }

  getFilterPass() {
    const renderModel = new THREE.RenderPass(this.scene, this.camera);
    const effectBloom = new THREE.BloomPass(4.5, 25, 12, 256);
    const effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    effectBloom.renderTargetX.texture.format = THREE.RGBAFormat;
    effectBloom.renderTargetY.texture.format = THREE.RGBAFormat;
    return [renderModel, effectBloom, effectCopy];
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      getWindowWidth() / getWindowHeight(),
      1,
      1000,
    );
    this.camera.position.set(0, 300, 500);
  }

  setScene() {
    this.scene = new THREE.Scene();
    for (let i = 0; i < this.props.count; i += 1) {
      this.addSceneAssetDiamond();
    }
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(getWindowWidth(), getWindowHeight());
    this.renderer.autoClear = false;
    this.container.appendChild(this.renderer.domElement);
  }

  handleWindowResize() {
    this.camera.aspect = getWindowWidth() / getWindowHeight();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(getWindowWidth(), getWindowHeight());
  }

  createInstance() {
    this.setCamera();
    this.setScene();
    this.setRenderer();
    const filterPass = this.getFilterPass();
    this.setComposer(filterPass);
    window.addEventListener(
      'resize',
      this.handleWindowResize.bind(this),
      false,
    );
  }

  destroyInstance() {
    this.container.removeChild(this.renderer.domElement);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
  }

  addSceneAssetDiamond() {
    const { palette, opacity } = this.props;
    const diamondColor = palette[Math.floor(Math.random() * palette.length)];
    const diamond = new THREE.Mesh(
      new THREE.SphereGeometry(2, 4, 2),
      new THREE.MeshBasicMaterial({
        color: diamondColor,
        transparent: true,
        opacity,
      }),
    );
    const diamondScale = Math.random() * 45;
    AXES.forEach((axis) => {
      diamond.position[axis] = generatePosition();
      diamond.scale[axis] = diamondScale;
    });
    this.scene.add(diamond);
    console.log(this.scene);
  }

  animateInstance() {
    this.animationFrame = requestAnimationFrame(
      this.animateInstance.bind(this),
    );
    const interval = 1000 / this.props.fps;
    const now = Date.now();
    const delta = now - this.state.then;
    if (delta > interval) {
      this.setState(({ theta }) => ({
        then: now - (delta % interval),
        theta: theta + this.props.speed,
      }));
    }
  }

  stopInstance() {
    cancelAnimationFrame(this.animationFrame);
  }

  renderScene() {
    AXES.forEach((axis) => {
      const maths = axis === 'z' ? Math.cos : Math.sin;
      this.camera.position[axis] = this.props.radius * maths(
        THREE.Math.degToRad(this.state.theta),
      );
    });
    this.camera.lookAt(this.scene.position);
    this.camera.updateMatrixWorld();
    this.renderer.clear();
    this.composer.render();
  }

  render() {
    if (this.renderer !== null) {
      this.renderScene();
    }
    return (
      <div
        className="headline-canvas"
        ref={(ref) => {
          this.container = ref;
        }}
      />
    );
  }
}

DiamondBackground.propTypes = {
  fps: PropTypes.number,
  speed: PropTypes.number,
  radius: PropTypes.number,
  opacity: PropTypes.number,
  count: PropTypes.number,
  palette: PropTypes.arrayOf(PropTypes.string),
};

DiamondBackground.defaultProps = {
  fps: 30,
  speed: 0.1,
  radius: 600,
  opacity: 0.1,
  count: 150,
  palette: [
    '#6dd1ff',
    '#1b87ff',
    '#0f1272',
    '#fcd1ff',
    '#8536a5',
    '#340843',
    '#32126a',
  ],
};
