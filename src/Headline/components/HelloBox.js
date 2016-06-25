import React, { Component } from 'react';

import '../stylesheets/HelloBox.scss';

export default class HelloBox extends Component {
  render() {
    return (
      <div className="hello-box">
        <div className="content">
          <svg height="230" width="700" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="230" width="700" />
          </svg>
          <p>Hello. My name is Shawn.<br />I make things.</p>
        </div>
      </div>
    );
  }
}
