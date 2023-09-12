import React from 'react';
import classes from './creditTerms.module.scss';
import { useTranslation } from 'react-i18next';

const data = [
  {
    tilte: 'conditions',
    descriptions: ['condition1', 'condition2', 'condition3'],
  },
  {
    tilte: 'provideds',
    descriptions: ['provided1', 'provided2', 'provided3', 'provided4'],
  },
  {
    tilte: 'partners',
    descriptions: [
      'partner1',
      'partner2',
      'partner3',
      'partner4',
      'partner5',
      'partner6',
      'partner7',
      'partner8',
    ],
  },
];

const CreditTerms = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.creditTerms}>
      <div className="container">
        <div className={classes.inner}>
          <div className={classes.terms}>
            {data.map((d, i) => {
              return (
                <div className={classes.term} key={i}>
                  <h3 className={classes.title}>{t(d.tilte)}</h3>
                  <ul className={classes.ul}>
                    {d.descriptions.map((desc) => {
                      return <li key={desc}>{t(desc)}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
            <p className={classes.call}>{t('call')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTerms;
