import Nerv from 'nervjs';
import PropTypes from 'prop-types';

export default function Icon({ name }) {
  return (
    <i className={`icon-${name}`} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
