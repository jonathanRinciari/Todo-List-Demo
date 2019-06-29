import React from 'react';
import Button from "../button/button";


const TodoTracker = (props) => {
  let baseClass = 'todo-tracker';

  return (
    <div className={baseClass}>
      <span className={`${baseClass}-counter`}>2 Tasks Remaining</span>
      <Button type="complete-all-tasks" text="Complete All"/>
    </div>
  )
};

export default TodoTracker;
