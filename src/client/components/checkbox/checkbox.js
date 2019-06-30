import React from 'react';
import PropTypes from "prop-types";


/**
 * Prop Types
 * @private
 */
const propTypes = {
  isChecked: PropTypes.bool,
  id: PropTypes.number,
  disabled: PropTypes.bool,
  onChangeHandler: PropTypes.func
};

const Checkbox = ({isChecked, onChangeHandler, id, disabled}) => {
  return(
    <p className="checkbox">
      <input disabled={disabled} onChange={onChangeHandler} type="checkbox" id={id} checked={isChecked}/>
      <label htmlFor={id}></label>
    </p>
  )
};

Checkbox.propTypes = propTypes;

export default Checkbox;
