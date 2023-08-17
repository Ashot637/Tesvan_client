import React from 'react';
import classes from './cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const dispatch = useDispatch();
  const { devices, isOpen } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  const totalPrice =
    devices.length &&
    devices.reduce((sum, device) => {
      return +device.price * device.count + sum;
    }, 0);

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
                  <Link to="/order" onClick={() => dispatch(toggleIsOpen())}>
                    <button className={classes.done}>{t('makeOrder')}</button>
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
