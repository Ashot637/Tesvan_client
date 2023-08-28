import React, { useEffect } from 'react';
import classes from './cartNotification.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationShow } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';

const CartNotification = () => {
  const dispatch = useDispatch();
  const { notificationShow, addedDevice } = useSelector((state) => state.cart);

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
      <CSSTransition in={notificationShow} timeout={300} classNames="notification" unmountOnExit>
        {addedDevice ? (
          <div className={classes.notification}>
            <p>Added to cart</p>
            <div className={classes.device}>
              <img
                src={'http://tesvan-electronics.onrender.com/' + addedDevice?.images[0]}
                alt="Added to cart item"
              />
              <div className={classes.title}>{addedDevice.title}</div>
            </div>
            <div className={classes.line} />
            <div className={classes.bottom}>
              <span>{addedDevice.count}pcs</span>
              <b>{getPrice(addedDevice.price * addedDevice.count)} AMD</b>
            </div>
            <button>Open Cart</button>
          </div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </>
  );
};

export default CartNotification;
