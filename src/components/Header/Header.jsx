import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from './header.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCodeCompare,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '../../hooks';
import { toggleIsOpen } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import HeaderTop from './HeaderTop/HeaderTop';
import MobileMenu from './MobileMenu/MobileMenu';
import DesktopNav from './DesktopNav/DesktopNav';
import SearchPanel from '../SearchPanel/SearchPanel';
import Cart from '../Cart/Cart';
import CartNotification from '../CartNotification/CartNotification';

const Header = () => {
  const dispatch = useDispatch();
  const isBigger930 = useMediaQuery('(max-width: 930px)');
  const { devicesIds: comparingDevices } = useSelector((state) => state.compare);
  const [isOpenSearchPanel, setIsOpenSearchPanel] = useState(false);
  const { isOpen: isOpenCart, devices: cartDevices } = useSelector((state) => state.cart);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(comparingDevices));
  }, [comparingDevices]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartDevices));
  }, [cartDevices]);

  useEffect(() => {
    const event = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', event);

    return () => {
      window.removeEventListener('scroll', event);
    };
  }, []);

  return (
    <>
      <div className="container">
        <HeaderTop />
      </div>
      <header className={scrolling ? classes.scrolling : undefined}>
        <div className="container">
          <div className={classes.inner}>
            <div className={classes.logo}>
              <NavLink to={'/'}>
                <img src={'/img/full-logo.png'} alt="logo" height={88} width={65} />
              </NavLink>
            </div>
            {isBigger930 && <DesktopNav />}
            <ul className={classes.btns}>
              {!isBigger930 && (
                <li className={classes.icon} onClick={() => setIsOpenSearchPanel(true)}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </li>
              )}
              <li
                style={{ position: 'relative' }}
                onClick={() => dispatch(toggleIsOpen())}
                className={isOpenCart ? classes.active : undefined}>
                {cartDevices.length ? (
                  <div className={classes.count}>{cartDevices.length}</div>
                ) : undefined}
                <FontAwesomeIcon icon={faCartShopping} />
                <CartNotification />
              </li>
              <li className={classes.compare}>
                {comparingDevices.length ? (
                  <div className={classes.count}>{comparingDevices.length}</div>
                ) : undefined}
                <NavLink
                  aria-label="compare"
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to="/compare">
                  <FontAwesomeIcon icon={faCodeCompare} />
                </NavLink>
              </li>
              {!isBigger930 && <MobileMenu />}
            </ul>
            <Cart />
          </div>
        </div>
      </header>
      {isOpenSearchPanel &&
        createPortal(
          <div
            style={{ height: document.body.scrollHeight }}
            className={classes.overlay}
            onClick={(e) => {
              if (e.target.classList[0]?.includes('overlay')) {
                setIsOpenSearchPanel(false);
              }
            }}>
            <SearchPanel setIsOpenSearchPanel={setIsOpenSearchPanel} />
          </div>,
          document.body,
        )}
    </>
  );
};

export default Header;
