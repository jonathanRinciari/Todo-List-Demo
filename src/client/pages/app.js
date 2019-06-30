import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import TodosPage from './todos-page';
import Header from '../components/header/header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <BrowserRouter>
      <div className={baseCls}>
        <Header />
        <Route path="/" component={TodosPage}/>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = propTypes;

export default App;
