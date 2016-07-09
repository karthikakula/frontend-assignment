import React from 'react';
import scss from './Sidebar.scss';
import classnames from 'classnames';

const Sidebar = ({ children, className, ...props }) => {
  const finalClassName = classnames(
    className,
    scss.sidebar
  );

  return (<div className={ finalClassName } {...props}>
    { children }
  </div>)
};

export default Sidebar;
