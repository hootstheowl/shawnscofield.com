import React, { Component } from 'react';
import { BubbleCanvas, DiamondWebGL, HelloBox } from './components';
import Modernizr from 'modernizr';

import './stylesheets/Headline.scss';

export default class HeadlineContainer extends Component {
  renderBackground() {
    if (Modernizr.webgl) {
      return (
        <DiamondWebGL />
      );
    } else if (Modernizr.canvas) {
      return (
        <BubbleCanvas />
      );
    }
    return (
      <div className="headline-canvas" />
    );
  }
  render() {
    return (
      <div className="headline-wrap">
        <HelloBox />
        {this.renderBackground()}
      </div>
    );
  }
}
