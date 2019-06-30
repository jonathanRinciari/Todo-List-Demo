import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Button from "../button/button";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  archiveAllHandler: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  archiveAllHandler: noop
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ archiveAllHandler}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  return (
    <div className={baseCls}>
      <div className="link-wrapper">
        <NavLink
          to="/"
          exact
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
        >
          All
        </NavLink>
        <NavLink
          to="/active"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
        >
          Active
        </NavLink>
        <NavLink
          to="/completed"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
        >
          Completed
        </NavLink>
        <NavLink
          to="/archived"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
        >
          Archived
        </NavLink>
      </div>
      <div className="archive-all-wrapper">
        <Button onClick={archiveAllHandler} type="archive-all" text="Archive All Completed" />
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
