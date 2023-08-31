import React, { memo } from 'react';
import classes from './itemsSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { useTranslation } from 'react-i18next';

const ItemsSection = memo(({ title, items, main, link }) => {
  const { brands } = useSelector((state) => state.brands);
  const { t } = useTranslation();

  return (
    <div>
      <div className="container">
        <h1 className={main ? classes.mainTitle : classes.title}>{t(title)}</h1>
        <div className={classes.grid}>
          {items &&
            items.map((item) => {
              return <Card key={item.id} brands={brands} item={item} />;
            })}
        </div>
        {!main && (
          <Link to={link} className={classes.all}>
            <span>{t('viewAll')}</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        )}
      </div>
    </div>
  );
});

export default ItemsSection;
