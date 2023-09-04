import React, { memo } from 'react';
import classes from '../Cart/cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addDevice, minusDevice, removeDevice, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartItem = memo(({ item, responsive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToOrderOutOfStock = () => {
    localStorage.setItem('outOfStockDeviceTitle', item.title);
    navigate('/contacts/order');
    dispatch(toggleIsOpen());
  };

  return (
    <>
      {!responsive ? (
        <tr>
          <td className={classes.remove} onClick={() => dispatch(removeDevice(item.id))}>
            <FontAwesomeIcon icon={faClose} />
          </td>
          <td>
            <img src={'http://localhost:8080/' + item?.images[0]} alt="Cart item" width={90} />
          </td>
          <td className={classes.name}>
            <div>{item.title}</div>
          </td>
          <td>
            <ul className={classes.counter}>
              {item.quantity === 0 ? (
                <>
                  <li className={classes.outOfStock}>{t('outOfStock')}</li>
                </>
              ) : (
                <>
                  <li
                    className={[
                      classes.inc,
                      item.quantity === item.count ? classes.disabled : undefined,
                    ].join(' ')}
                    onClick={() => dispatch(addDevice(item))}>
                    <FontAwesomeIcon icon={faPlus} />
                  </li>
                  <li className={classes.count}>{item.count}</li>
                  <li
                    className={[classes.dec, item.count === 1 ? classes.disabled : undefined].join(
                      ' ',
                    )}
                    onClick={() => dispatch(minusDevice(item.id))}>
                    <FontAwesomeIcon icon={faMinus} />
                  </li>
                </>
              )}
            </ul>
          </td>
          <td>
            {item.quantity === 0 ? (
              <span onClick={navigateToOrderOutOfStock} className={classes.contactUs}>
                {t('contactUs')}
              </span>
            ) : (
              <b>{getPrice(item.price * item.count)} AMD</b>
            )}
          </td>
        </tr>
      ) : (
        <div className={classes.card}>
          <div className={classes.remove} onClick={() => dispatch(removeDevice(item.id))}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className={classes.device}>
            <div className={classes.img}>
              <img src={'http://localhost:8080/' + item?.images[0]} alt="Cart item" width={75} />
            </div>
            <div className={classes.deviceInfo}>
              <p>{item.title}</p>
              <ul className={classes.counter}>
                {item.quantity === 0 ? (
                  <li className={classes.outOfStock}>{t('outOfStock')}</li>
                ) : (
                  <>
                    <li
                      className={[
                        classes.inc,
                        item.quantity === item.count ? classes.disabled : undefined,
                      ].join(' ')}
                      onClick={() => dispatch(addDevice(item))}>
                      <FontAwesomeIcon icon={faPlus} />
                    </li>
                    <li className={classes.count}>{item.count}</li>
                    <li
                      className={[
                        classes.dec,
                        item.count === 1 ? classes.disabled : undefined,
                      ].join(' ')}
                      onClick={() => dispatch(minusDevice(item.id))}>
                      <FontAwesomeIcon icon={faMinus} />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {item.quantity === 0 ? (
            <span onClick={navigateToOrderOutOfStock} className={classes.contactUs}>
              {t('contactUs')}
            </span>
          ) : (
            <div className={classes.devicePrice}>{getPrice(item.price * item.count)} AMD</div>
          )}
        </div>
      )}
    </>
  );
});

export default CartItem;
