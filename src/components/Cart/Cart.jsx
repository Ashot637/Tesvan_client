import React, { useEffect, useRef, useState } from 'react';
import classes from './cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { useLocation, Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { devices } = useSelector((state) => state.cart);
  const [height, setHeight] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    setHeight(document.body.scrollHeight - 880);
    if (ref.current) {
      dispatch(toggleIsOpen());
    }
    ref.current = true;
  }, [location.pathname]);

  const totalPrice =
    devices.length &&
    devices.reduce((sum, device) => {
      return +device.price * device.count + sum;
    }, 0);

  return (
    <div className={classes.overlay} style={{ height }}>
      <div className={classes.cart}>
        <div className={classes.close} onClick={() => dispatch(toggleIsOpen())}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className={classes.title}>Your cart</div>
        {devices.length ? (
          <>
            <div className={classes.deleteAll} onClick={() => dispatch(removeAll())}>
              Delete all
            </div>
            <table className={classes.items}>
              <tbody>
                {devices.map((device, i) => {
                  return <CartItem key={i} item={device} />;
                })}
              </tbody>
            </table>
            <div className={classes.order}>
              <div className={classes.total}>
                <span>Total for payment:</span>
                <b>{getPrice(totalPrice)} AMD</b>
              </div>
              <div className={classes.btns}>
                <div className={classes.back} onClick={() => dispatch(toggleIsOpen())}>
                  {'<<'} Back to shoping
                </div>
                <Link to="/order">
                  <button className={classes.done}>Make order</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <h3>Your Cart is Empty</h3>
        )}
      </div>
    </div>
  );
};

export default Cart;
