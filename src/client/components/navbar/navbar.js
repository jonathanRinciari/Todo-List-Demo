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
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, archiveAllHandler}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let archiveLinkCls = `${baseCls}__item`;
  archiveLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <div className="link-wrapper">
        <NavLink
          to="/"
          activeClassName={`${baseCls}__item--active`}
          className={`${baseCls}__item`}
          onClick={() => onClickFilter('')}
        >
          All
        </NavLink>
        <span
          className={activeLinkCls}
          onClick={() => onClickFilter('active')}
        >
          Active
        </span>
        <span
          className={completedLinkCls}
          onClick={() => onClickFilter('completed')}
        >
          Completed
        </span>
        <span
          className={archiveLinkCls}
          onClick={() => onClickFilter('archived')}
        >
          Archived
        </span>
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
