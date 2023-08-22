import React, { useEffect } from 'react';
import classes from './cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, setDevices, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import axios from '../../helpers/axios';

const Cart = () => {
  const dispatch = useDispatch();
  let { devices, isOpen } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  const totalPrice =
    devices.length &&
    devices.reduce((sum, device) => {
      return +device.price * device.count + sum;
    }, 0);

  useEffect(() => {
    const ids = devices.map((device) => device.id);
    devices = devices.map((d) => {
      let { quantity, ...data } = d;
      return data;
    });
    axios.post('/devices/ids', { ids }).then(({ data }) => {
      let newDevices = mergeArrays(data, devices);
      newDevices = newDevices.map((device) => {
        if (device.quantity < device.count) {
          return {
            ...device,
            count: device.quantity,
          };
        }
        return device;
      });
      dispatch(setDevices(newDevices));
    });
  }, []);

  const mergeArrays = (array1, array2) => {
    const resultMap = new Map();

    array1.forEach((item) => {
      resultMap.set(item.id, { ...item });
    });

    array2.forEach((item) => {
      const existingItem = resultMap.get(item.id);
      if (existingItem) {
        Object.assign(existingItem, item);
      } else {
        resultMap.set(item.id, { ...item });
      }
    });

    return Array.from(resultMap.values());
  };

  return (
    <div className={classes.overlay}>
      <CSSTransition in={isOpen} timeout={400} classNames="cart" unmountOnExit>
        <div className={classes.cart}>
          <div className={classes.close} onClick={() => dispatch(toggleIsOpen())}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className={classes.title}>{t('cart')}</div>
          {devices.length ? (
            <>
              <div className={classes.deleteAll} onClick={() => dispatch(removeAll())}>
                {t('deleteAll')}
              </div>
              <table className={classes.items}>
                <tbody>
                  {devices.map((device, i) => {
                    return <CartItem key={i} item={device} />;
                  })}
                </tbody>
              </table>
              <div className={classes.cards}>
                {devices.map((device, i) => {
                  return <CartItem key={i} item={device} responsive />;
                })}
              </div>
              <div className={classes.order}>
                <div className={classes.total}>
                  <span>{t('total')}:</span>
                  <b>{getPrice(totalPrice)} AMD</b>
                </div>
                <div className={classes.btns}>
                  <div className={classes.back} onClick={() => dispatch(toggleIsOpen())}>
                    {'<<'} {t('back')}
                  </div>
                  <Link to="/make-order" onClick={() => dispatch(toggleIsOpen())}>
                    <button
                      disabled={devices.find((device) => device.quantity === 0)}
                      className={classes.done}>
                      {t('make-order')}
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <h3>Your Cart is Empty</h3>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Cart;
