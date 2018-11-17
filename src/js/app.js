import Nerv, { render, Component } from 'nervjs';
import { webgl, canvas } from 'modernizr';
import { isEmpty } from 'lodash.isempty';
import { DiamondBackground, HelloBox } from './components';

import '../stylesheets/app.scss';

const minSpeed = 0.25;
const maxSpeed = 1.0;
const multiplier = 1.05;
const interval = 300;

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: minSpeed,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ speed, increase }) => {
        let nextIncrease = isEmpty(increase) && true;
        let nextSpeed = speed;
        if (speed <= minSpeed && increase === false) {
          nextIncrease = true;
        }
        if (speed >= maxSpeed && increase === true) {
          nextIncrease = false;
        }
        if (nextIncrease === true) {
          nextSpeed = speed * multiplier;
        }
        if (nextIncrease === false) {
          nextSpeed = speed / multiplier;
        }
        return {
          speed: nextSpeed,
          increase: nextIncrease,
        };
      });
    }, interval);
  }

  render() {
    return (
      <div className="headline-wrap">
        <HelloBox delay={1500} />
        { webgl && canvas && <DiamondBackground speed={this.state.speed} />}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
