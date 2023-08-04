import React from 'react';
import classes from './thanks.module.scss';
import { Link } from 'react-router-dom';
const Thanks = ({ img, title, subtitle, btn }) => {
  return (
    <div className={classes.thanks}>
      <div className="container">
        <div className={classes.block}>
          <img src={img} alt={title} />
          <div className={classes.title}>{title}</div>
          <div className={classes.subtitle}>{subtitle}</div>
          <Link to="/">
            <button className={classes.btn}>{btn}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
