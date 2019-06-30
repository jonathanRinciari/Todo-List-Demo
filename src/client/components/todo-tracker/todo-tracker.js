import React from 'react';
import Button from "../button/button";
import Status from '../../assets/status.svg';
import PropTypes from "prop-types";
import Todos from "../todos/todos";


const TodoTracker = ({count, completeAllTasksHandler}) => {
  let baseClass = 'todo-tracker';

  const renderBanner = () => {
    return count ? (
      <>
        <span className={`${baseClass}-counter`}>{count} {count > 1 ? 'Tasks' : 'Task'} Remaining</span>
        <Button onClick={completeAllTasksHandler} type="complete-all-tasks" text="Complete All"/>
      </>
    ) : (
      <div className={`${baseClass}-all-tasks-complete`}>
        <img src={Status} alt="done"/>
        <span>All Tasks Complete!</span>
      </div>
    )
  };

  return (
    <div className={baseClass}>
      {renderBanner()}
    </div>
  )
};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  count: PropTypes.number,
  completeAllTasksHandler: PropTypes.func
};

TodoTracker.propTypes = propTypes;
export default TodoTracker;
