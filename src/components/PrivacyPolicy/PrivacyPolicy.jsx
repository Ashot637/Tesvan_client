import React, { Fragment } from 'react';
import classes from './privacyPolicy.module.scss';
import { useTranslation } from 'react-i18next';

const data = [
  {
    title: 'privacy.general.title1',
    subtitle: 'privacy.general.subtitle1',
    descriptions: [
      'privacy.general.desc1',
      'privacy.general.desc2',
      'privacy.general.desc3',
      'privacy.general.desc4',
    ],
  },
  {
    title: 'privacy.general.title2',
    subtitle: 'privacy.general.subtitle2',
    descriptions: [
      'privacy.general.desc5',
      'privacy.general.desc6',
      'privacy.general.desc7',
      'privacy.general.desc8',
    ],
  },
  {
    title: 'privacy.general.title3',
    subtitle: 'privacy.general.subtitle3',
    descriptions: ['privacy.general.desc9', 'privacy.general.desc10'],
  },
  {
    title: 'privacy.general.title4',
    descriptions: ['privacy.general.desc11'],
  },
  {
    title: 'privacy.general.title5',
    descriptions: ['privacy.general.desc12'],
  },
  {
    title: 'privacy.general.title6',
    descriptions: ['privacy.general.desc13'],
  },
];

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.privacyPolicy}>
      <div className="container">
        <div className={classes.inner}>
          <span className={classes.title}>{t('privacy-policy')}</span>
          <ul className={classes.terms}>
            <li>
              <p>{t('privacy.title')}</p>
            </li>
            <li>
              <span>{t('privacy.viewing')}</span>
              <br />
              <br />
              <p>
                {t('privacy.sendEmail')}{' '}
                <a
                  href="https://mail.google.com/mail/u/0/?fs=1&to=info@tesvanelectronics.am&su=SUBJECT&body=BODY&bcc=info@tesvanelectronics.am&tf=cm"
                  target="_blank"
                  rel="noopener noreferrer">
                  info@tesvanelectronics.am
                </a>
              </p>
            </li>
            <li>
              <span>{t('privacy.general.title')}</span>
              {data.map((d, i) => {
                return (
                  <Fragment key={i}>
                    <div className={classes.subtitle}>
                      <span>{t(d.title)}</span>
                      <p>{t(d.subtitle)}</p>
                    </div>
                    <ul>
                      {d.descriptions.map((desc, i) => {
                        return <li key={i}>{t(desc)}</li>;
                      })}
                    </ul>
                  </Fragment>
                );
              })}
              <p>
                <br />
                {t('privacy.regards')} <br /> Tesvan Electronics
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
