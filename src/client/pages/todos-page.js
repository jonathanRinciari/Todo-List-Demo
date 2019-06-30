import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import {api, archiveAllTasks, completeAllTasks} from '../helpers/api';
import Navbar from '../components/navbar/navbar';
import TodoForm from '../components/todo-form/todo-form';
import Todos from '../components/todos/todos';
import TodoTracker from "../components/todo-tracker/todo-tracker";
import {BrowserRouter, Route, Switch, Redirect, withRouter} from "react-router-dom";

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page';

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filterBy: this.parseRoute(props.location.pathname)
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
    this.props.history.listen((location) => {
      this.setState({filterBy: this.parseRoute(location.pathname)});
    });
  }


  /**
   * Parses current route to determine the active filter for tasks
   * @returns {string}
   */
  parseRoute = (path) => {
    let filterBy = null;
    if (path === '/active') {
      filterBy = 'active';
    } else if (path === '/completed') {
      filterBy = 'completed';
    } else if (path === '/archived') {
      filterBy = 'archived';
    }
    return filterBy;
  };

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Completes all active tasks
   */
  handleCompleteAllTasks = () => {
    completeAllTasks(this.updateTodos)
  };

  /**
   * Archive all complete tasks
   */
  handleArchiveAllTasks = () => {
    archiveAllTasks(this.updateTodos);
  };

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const { filterBy, todos } = this.state;

    return (
      <div className={this.baseCls}>
        <Navbar archiveAllHandler={this.handleArchiveAllTasks} filterBy={filterBy}/>
        <TodoTracker completeAllTasksHandler={this.handleCompleteAllTasks} count={todos.filter((todo) => todo.status === 'active').length}/>
        <TodoForm onSubmit={this.addTodo} />
        <BrowserRouter>
          <Switch>
            <Route path={["/", "/active", "/archived", "/completed"]} exact render={() => (
              <Todos filterBy={filterBy}
                     todos={todos}
                     updateTodos={this.updateTodos}/>
            )}/>
            <Redirect from='*' to='/' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(TodosPage);
