import Nerv, { Component } from 'nervjs';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { OUTBOUND_LINK_DATA } from '../constants';

import '../../stylesheets/components/HelloBox.scss';

export default class HelloBox extends Component {
  constructor() {
    super();
    this.state = {
      renderComponent: false,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setRenderComponent();
    }, this.props.delay);
  }

  setRenderComponent() {
    this.setState({ renderComponent: true });
  }

  render() {
    if (this.state.renderComponent === false) {
      return null;
    }
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
          {OUTBOUND_LINK_DATA.map(({ url, title, iconName }) => (
            <a href={url} title={title} target="_blank">
              <Icon name={iconName} />
            </a>
          ))}
        </div>
      </div>
    );
  }
}

HelloBox.propTypes = {
  delay: PropTypes.number,
};

HelloBox.defaultProps = {
  delay: 0,
};
