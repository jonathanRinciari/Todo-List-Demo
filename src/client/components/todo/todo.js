import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Close from '../../assets/close.svg';

import Button from '../button/button';
import TodoLink from '../todo-link/todo-link';
import Checkbox from "../checkbox/checkbox";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({filtered, onClickDelete, onClickTodo, status, text, id}) => {

  const [isChecked, setIsChecked] = useState(false);

  /**
   * Base CSS class
   */
  const baseCls = 'todo';



  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const onChangeHandler = () => {
      setIsChecked(!isChecked)
  };


  const shouldRender = () => {
    return isChecked && status === 'complete' ? (
      <Button type="archive-one" text="Archive"/>
    ) : null
  };

    return (
      <li className={todoCls} style={{borderTop: 'unset'}}>
        <Checkbox disabled={status === 'active'} isChecked={isChecked && status==='complete'} onChangeHandler={onChangeHandler} id={id}/>
        <div className="todo-link-wrapper">
          <TodoLink text={text} onClick={onClickTodo} />
          {shouldRender()}
        </div>
        <img className={`${baseCls}-image`} onClick={onClickDelete} src={Close} alt="Close"/>

      </li>
    );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
