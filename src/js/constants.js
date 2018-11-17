import three from 'three-js';
import Projector from 'three-js/addons/Projector';
import CanvasRenderer from 'three-js/addons/CanvasRenderer';
import RenderPass from 'three-js/addons/RenderPass';
import BloomPass from 'three-js/addons/BloomPass';
import ShaderPass from 'three-js/addons/ShaderPass';
import MaskPass from 'three-js/addons/MaskPass';
import CopyShader from 'three-js/addons/CopyShader';
import EffectComposer from 'three-js/addons/EffectComposer';
import ConvolutionShader from 'three-js/addons/ConvolutionShader';

export const THREE = three([
  Projector,
  CanvasRenderer,
  RenderPass,
  BloomPass,
  ShaderPass,
  CopyShader,
  EffectComposer,
  ConvolutionShader,
  MaskPass,
]);

export const OUTBOUND_LINK_DATA = [
  {
    url: 'https://github.com/hootstheowl',
    title: 'GitHub',
    iconName: 'github-circled',
  },
  {
    url: 'https://stackoverflow.com/users/6590624/hootstheowl',
    title: 'Stack Overflow',
    iconName: 'stackoverflow',
  },
  {
    url: 'https://linkedin.com/in/shawn-scofield',
    title: 'Linkedin',
    iconName: 'linkedin',
  },
  {
    url: 'https://codepen.io/hootstheowl',
    title: 'CodePen',
    iconName: 'codeopen',
  },
];

export const AXES = ['x', 'y', 'z'];
