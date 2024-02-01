import React, { useEffect } from 'react';
import classes from './cartNotification.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationShow } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { useTranslation } from 'react-i18next';

const CartNotification = () => {
  const dispatch = useDispatch();
  const { notificationShow, addedDevice } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  useEffect(() => {
    let timeout;
    if (notificationShow === true) {
      timeout = setTimeout(() => {
        dispatch(setNotificationShow(false));
      }, 3000);
    }
    if (notificationShow === false) {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [notificationShow]);

  return (
    <>
      <CSSTransition
        in={notificationShow}
        timeout={300}
        classNames="cart-notification"
        unmountOnExit>
        {addedDevice ? (
          <div className={classes.notification}>
            <p>{t('addedToCart')}</p>
            <div className={classes.device}>
              <img
                src={'https://tesvanelectronics.am/service/' + addedDevice?.images[0]}
                alt="Added to cart item"
              />
              <div className={classes.title}>{addedDevice.title}</div>
            </div>
            <div className={classes.line} />
            <div className={classes.bottom}>
              <span>
                {addedDevice.count}
                {t('pcs')}
              </span>
              <b>
                {getPrice(addedDevice.price * addedDevice.count)} {t('amd')}
              </b>
            </div>
            <button>{t('openCart')}</button>
          </div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </>
  );
};

export default CartNotification;
