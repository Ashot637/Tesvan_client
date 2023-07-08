import React, { useEffect, useState } from 'react';
import classes from './header.module.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../img/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faCartShopping,
  faCodeCompare,
  faGlobe,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen } from '../../redux/slices/cartSlice';
import SearchPanel from '../SearchPanel/SearchPanel';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

const languages = ['English', 'Armenian', 'Russian'];

const Header = () => {
  const dispatch = useDispatch();
  const [language, setLaungage] = useState(languages[0]);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { isOpen: isOpenCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <div className="container">
        <div className={classes.top}>
          <ul className={classes.flex}>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <span>+ (374) 91 75 19 00</span>
            </li>
            <li onClick={() => setIsOpenLanguage((isOpen) => !isOpen)}>
              <FontAwesomeIcon icon={faGlobe} />
              <div className="select">{language}</div>
              <FontAwesomeIcon
                className={classes.angle}
                style={isOpenLanguage ? { transform: 'rotateX(180deg)' } : undefined}
                icon={faAngleDown}
              />

              {isOpenLanguage && (
                <ul className={classes.options}>
                  {languages.map((lan) => {
                    return lan === language ? undefined : (
                      <li key={lan} onClick={() => setLaungage(lan)}>
                        {lan}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      <header>
        <div className="container">
          <div className={classes.inner}>
            <div className={classes.logo}>
              <NavLink to={'/'}>
                <img src={logo} alt="logo" />
              </NavLink>
            </div>
            <div className={classes.nav}>
              <SearchPanel />
              <nav>
                <ul className={classes.links}>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/categories'}>
                      Categories
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/about-us'}>
                      About Us
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/credit-terms'}>
                      Credit terms
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/contacts'}>
                      Contacts
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className={classes.btns}>
              <li className="cart" onClick={() => dispatch(toggleIsOpen())}>
                <FontAwesomeIcon icon={faCartShopping} />
              </li>
              <li className="compare">
                <FontAwesomeIcon icon={faCodeCompare} />
              </li>
            </ul>
            {isOpenCart && <Cart />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
