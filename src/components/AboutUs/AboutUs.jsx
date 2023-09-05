import React from 'react';
import classes from './aboutUs.module.scss';
import img from '../../img/about-us.webp';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.about}>
      <div className="container">
        <div className={classes.inner}>
          <div className={[classes.subtitle, classes.mobile].join(' ')}>
            We are dedicated to customer satisfaction and constantly seek the latest technology to
            serve you better. Explore our products and experience precision and innovation
            firsthand.
            <br />
            <br />
            We look forward to seeing you.
          </div>
          <img width={587} height={640} src={img} className={classes.img} alt="About Us" />
          <div className={classes.text}>
            <span className={classes.title}>{t('about-us')}</span>
            <div className={classes.subtitle}>
              Welcome to “Tesvan”, where expertise meets innovation. We are an outsourcing company
              specializing in software testing and QA services. Founded in 2020, we excel in Quality
              Assurance while offering the latest electronic gadgets. Our team of industry experts
              guarantees the highest quality in both our services and product offerings.
              <br />
              <br />
              <p>
                We are dedicated to customer satisfaction and constantly seek the latest technology
                to serve you better. Explore our products and experience precision and innovation
                firsthand.
                <br />
                <br />
                We look forward to seeing you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
