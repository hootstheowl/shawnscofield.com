import React, { Component, PropTypes } from 'react';
import threeJS from 'three-js';
import Projector from 'three-js/addons/Projector';
import CanvasRenderer from 'three-js/addons/CanvasRenderer';
const THREE = threeJS([Projector, CanvasRenderer]);

export default class BubbleCanvas extends Component {
  static propTypes = {
    fps: PropTypes.number,
    border: PropTypes.number,
    theta: PropTypes.number,
    readius: PropTypes.number,
    opacity: PropTypes.number,
    count: PropTypes.number,
    palette: PropTypes.func,
  }
  static defaultProps = {
    fps: 30,
    border: 9,
    theta: 0.1,
    readius: 600,
    opacity: 0.15,
    count: 100,
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
  programStroke(context) {
    const cxt = context;
    cxt.globalAlpha = this.props.opacity;
    cxt.lineWidth = 0.025;
    cxt.shadowBlur = 40;
    cxt.shadowColor = cxt.fillStyle;
    cxt.beginPath();
    cxt.arc(0, 0, 0.5, 0, Math.PI * 2, true);
    cxt.fill();
    cxt.stroke();
  }
  addBubble() {
    const bubbleColor = this.props.palette[Math.floor(
      Math.random() * this.props.palette.length
    )];
    const bubble = new THREE.Sprite(
      new THREE.SpriteCanvasMaterial({
        color: bubbleColor,
        program: this.programStroke.bind(this),
      })
    );
    bubble.position.x = this.generatePosition();
    bubble.position.y = this.generatePosition();
    bubble.position.z = this.generatePosition();
    bubble.scale.x = bubble.scale.y = Math.random() * 40 + 20;
    this.scene.add(bubble);
  }
  init() {
    this.camera = new THREE.PerspectiveCamera(
      45, (this.windowWidth() / this.windowHeight()), 1, 1000
    );
    this.camera.position.set(0, 300, 500);
    this.scene = new THREE.Scene();
    for (let i = 0; i < this.props.count; i ++) {
      this.addBubble();
    }
    this.renderer = new THREE.CanvasRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.windowWidth(), this.windowHeight());
    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.handleWindowResize.bind(this), false);
  }
  destroyInstance() {
    this.container.removeChild(this.renderer.domElement);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
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
    const { readius } = this.props;
    const { theta } = this.state;
    this.camera.position.x = readius * Math.sin(
      THREE.Math.degToRad(theta)
    );
    this.camera.position.y = readius * Math.sin(
      THREE.Math.degToRad(theta)
    );
    this.camera.position.z = readius * Math.cos(
      THREE.Math.degToRad(theta)
    );
    this.camera.lookAt(this.scene.position);
    this.camera.updateMatrixWorld();
    this.renderer.render(this.scene, this.camera);
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
