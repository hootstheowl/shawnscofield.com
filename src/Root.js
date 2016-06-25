import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import routes from './routes';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  render() {
    return (
      <Router history={this.props.history} routes={routes} />
    );
  }
}
