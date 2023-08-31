import React from 'react';
import { Helmet } from 'react-helmet';
import classes from '../styles/404.module.scss';
import error404 from '../img/404.png';
import error404small from '../img/404small.png';

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>Page not found | Tesvan Electronics</title>
      </Helmet>
      <div className={classes.page404}>
        <div className="container">
          <div className={classes.block}>
            <div className={classes.imgs}>
              <img src={error404} alt="Page not found" />
              <img src={error404small} alt="Page not found" />
            </div>
            <h2>OPPS! Page not found</h2>
            <button>Back to homepage</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
