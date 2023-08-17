import React from 'react';
import classes from './aboutUs.module.scss';
import img from '../../img/iphone.png';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.about}>
      <div className="container">
        <div className={classes.inner}>
          <div className={[classes.subtitle, classes.mobile].join(' ')}>
            Condimentum ac, vestibulum eu nisl. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis condimentum ac,
            vestibulum eu nisl.
          </div>
          <img src={img} className={classes.img} alt="About Us" />
          <div className={classes.text}>
            <span className={classes.title}>{t('about')}</span>
            <div className={classes.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis.
              <br />
              <p>
                Condimentum ac, vestibulum eu nisl. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis
                condimentum ac, vestibulum eu nisl.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
