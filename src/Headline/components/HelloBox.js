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
          <p>
            Hello. My name is Shawn.
            <br />
            I make things.
          </p>
        </div>
        <div className="links">
          <a
            href="https://github.com/hootstheowl/shawnscofield.com"
            target="_blank"
          >
            <i className="fa fa-github" />
          </a>
          <a
            href="http://stackoverflow.com/users/6590624/hootstheowl"
            target="_blank"
          >
            <i className="fa fa-stack-overflow" />
          </a>
          <a
            href="https://www.linkedin.com/in/shawn-scofield"
            target="_blank"
          >
            <i className="fa fa-linkedin" />
          </a>
        </div>
      </div>
    );
  }
}
