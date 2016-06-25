import React, { Component } from 'react';
import { BubbleCanvas, DiamondWebGL, HelloBox } from './components';
import Modernizr from 'modernizr';

import './stylesheets/Headline.scss';

export default class HeadlineContainer extends Component {
  renderBubbles() {
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
        <a href="https://github.com/hootstheowl/shawnscofield.com">
          <img
            style={{
              position: 'absolute', top: 0, right: 0, border: 0,
            }}
            src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67"
            alt="Fork me on GitHub"
          />
        </a>
        <HelloBox />
        {this.renderBubbles()}
      </div>
    );
  }
}
