import React from 'react';


const Checkbox = ({isChecked, onChangeHandler, id, disabled}) => {
  return(
    <p className="checkbox">
      <input disabled={disabled} onChange={onChangeHandler} type="checkbox" id={id} checked={isChecked}/>
      <label htmlFor={id}></label>
    </p>
  )
};

export default Checkbox;
