import React, { memo } from 'react';
import classes from '../orderForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import getPrice from '../../../helpers/getPrice';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../../../hooks';

const OrderDetails = memo(
  ({ devices, deliveryMethod, selectedRegion, totalPrice, onRemoveItem }) => {
    const { t } = useTranslation();
    const isBigger450 = useMediaQuery('(max-width: 450px)');

    return (
      <div className={classes.block}>
        <div className={classes.title}>{t('orderDetails')}</div>
        {isBigger450 ? (
          <table className={classes.devices}>
            <tbody>
              {devices.map((device) => {
                return (
                  <tr key={device.id}>
                    <td className={classes.remove} onClick={() => onRemoveItem(device.id)}>
                      <FontAwesomeIcon icon={faClose} />
                    </td>
                    <td>
                      <div className={classes.deviceImg}>
                        <img
                          src={'http://134.209.251.128/service/' + device?.images[0]}
                          width={50}
                          height={33.8}
                          alt="Device Order"
                        />
                      </div>
                    </td>
                    <td className={classes.name}>{device.title}</td>
                    <td>
                      <div className={classes.count}>{device.count}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <b>
                        {getPrice(device.price * device.count)} {t('amd')}
                      </b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={classes.devicesMobile}>
            {devices.map((device) => {
              return (
                <div className={classes.deviceMobile} key={device.id}>
                  <div className={classes.remove} onClick={() => onRemoveItem(device.id)}>
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                  <div className={classes.deviceMobileImg}>
                    <img
                      src={'http://134.209.251.128/service/' + device?.images[0]}
                      width={78}
                      height={53}
                      alt="Device Order"
                    />
                  </div>
                  <div className={classes.info}>
                    <span>{device.title}</span>
                    <div className={classes.count}>{device.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={classes.total}>
          <div className={classes.flex}>
            <span>{t('total')}</span>
            <span style={{ color: 'white' }}>
              {getPrice(totalPrice + (deliveryMethod === 1 ? selectedRegion?.price : 0))} {t('amd')}
            </span>
          </div>
          <div className={classes.flex}>
            <span>{t('productXpcs', { count: devices.length })}</span>
            <span>{getPrice(totalPrice)} AMD</span>
          </div>
          {deliveryMethod === 1 ? (
            <div className={classes.flex}>
              <span>{t('delivery')}</span>
              {selectedRegion && (
                <span style={{ textAlign: 'right' }}>
                  {selectedRegion.id === 0
                    ? t('selectRegion')
                    : selectedRegion.price === 0
                    ? t('free')
                    : getPrice(selectedRegion?.price) + ' ' + t('amd')}
                </span>
              )}
            </div>
          ) : (
            <div className={classes.flex}>
              <span>{t('pickup')}</span>
              <span>{t('free')}</span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default OrderDetails;
