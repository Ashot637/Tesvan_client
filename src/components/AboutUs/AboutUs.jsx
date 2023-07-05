import React from 'react';
import classes from './aboutUs.module.scss';

const AboutUs = () => {
  return (
    <div className={classes.about}>
      <div className="container">
        <div className={classes.inner}>
          <div className={classes.img}></div>
          <div className={classes.text}>
            <span className={classes.title}>ABOUT US</span>
            <div className={classes.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis.
              <br />
              Condimentum ac, vestibulum eu nisl. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
              condimentum ac, vestibulum eu nisl.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
