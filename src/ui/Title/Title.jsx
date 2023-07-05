import React from 'react';
import classes from './title.module.scss';

const Title = ({ title, children }) => {
  return (
    <div className={classes.title}>
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Title;
