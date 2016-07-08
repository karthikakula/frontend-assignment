import React from 'react';
import classnames from './pegboard.scss';
import classnames from 'classnames';

const Pegboard = ({ className, ...props }) => {
  const className = classnames(className, classnames.pegBoard);

  return (<svg className={ className } {...props}>
  </svg>)
};

export default Pegboard;
