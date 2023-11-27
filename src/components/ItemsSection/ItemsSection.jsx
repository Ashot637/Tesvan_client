import { memo } from 'react';
import classes from './itemsSection.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Card from '../Card/Card';

const ItemsSection = memo(({ title, items, main, link }) => {
  const { devicesIds: comparingDevices } = useSelector((state) => state.compare);
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  return (
    <div>
      <div className="container">
        <h1 className={main ? classes.mainTitle : classes.title}>{t(title)}</h1>
        <div className={classes.grid}>
          {items?.map((item) => {
            return (
              <Card
                key={item.id}
                inCompareList={comparingDevices.includes(item.id)}
                inCart={!!cartDevices.find((device) => device.id === item.id)}
                item={item}
              />
            );
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
