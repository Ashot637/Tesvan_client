import React from 'react';
import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.overlay}>
      <span class={classes.loader}></span>;
    </div>
  );
};

export default Spinner;
