import React, { useEffect } from 'react';
import classes from './cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, setDevices, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../../hooks';
import axios from '../../helpers/axios';

const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isBigger700 = useMediaQuery('(max-width: 700px)');
  let { devices, isOpen } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  const totalPrice =
    devices.length &&
    devices.reduce((sum, device) => {
      return +device.price * device.count + sum;
    }, 0);

  useEffect(() => {
    const ids = devices.map((device) => device.id);
    let items = devices.map((d) => {
      let { quantity, ...data } = d;
      return data;
    });
    axios.post('/devices/ids', { ids }).then(({ data }) => {
      let newDevices = mergeArrays(data, items);
      newDevices = newDevices.map((device) => {
        if (device.quantity < device.count) {
          return {
            ...device,
            count: device.quantity,
          };
        } else if (device.count === 0 && device.quantity > 0) {
          return {
            ...device,
            count: 1,
          };
        }
        return device;
      });
      dispatch(setDevices(newDevices));
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      dispatch(toggleIsOpen(false));
    }
  }, [location]);

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
    <div
      data-testid="cart-closeCartByClickingOutside"
      className={classes.overlay}
      onClick={(e) => {
        if (e.target.classList[0]?.includes('overlay')) {
          dispatch(toggleIsOpen(false));
        }
      }}>
      <CSSTransition in={isOpen} timeout={400} classNames="cart" unmountOnExit>
        <div className={classes.cart} data-testid="cart">
          <div
            data-testid="cart-closeCartButton"
            className={classes.close}
            onClick={() => dispatch(toggleIsOpen(false))}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className={classes.title}>{t('cart')}</div>
          {devices.length ? (
            <>
              <div className={classes.deleteAll} onClick={() => dispatch(removeAll())}>
                {t('deleteAll')}
              </div>
              {isBigger700 ? (
                <table className={classes.items}>
                  <tbody>
                    {devices.map((device, i) => {
                      return <CartItem key={i} item={device} />;
                    })}
                  </tbody>
                </table>
              ) : (
                <div className={classes.cards}>
                  {devices.map((device, i) => {
                    return <CartItem key={i} item={device} smallScreen />;
                  })}
                </div>
              )}
              <div className={classes.order}>
                <div className={classes.total}>
                  <span>{t('total')}:</span>
                  <b style={{ textAlign: 'right' }}>
                    {getPrice(totalPrice)} {t('amd')}
                  </b>
                </div>
                <div className={classes.btns}>
                  <div className={classes.back} onClick={() => dispatch(toggleIsOpen())}>
                    {'<<'} {t('back')}
                  </div>
                  <Link to="/make-order">
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
            <div className={classes.emptyCart}>
              <img width={200} height={200} src={'/img/empty.webp'} alt="Empty cart" />
              <span className={classes.empty}>{t('emptyCartTitle')}</span>
              <span>{t('emptyCartSubtitle')}</span>
              <div className={classes.back} onClick={() => dispatch(toggleIsOpen())}>
                {'<<'} {t('back')}
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Cart;
