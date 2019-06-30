import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  type: '',
  disabled: false
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, onClick, type, disabled }) => {
  /**
   * Base CSS class
   */
  let baseCls = 'button';
  type.length > 0 ? baseCls += ` button-${type}` : null;
  return (
    <button disabled={disabled} className={baseCls} onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
