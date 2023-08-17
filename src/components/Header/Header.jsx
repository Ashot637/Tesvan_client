import React, { useEffect, useRef, useState } from 'react';
import classes from './header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faBars,
  faCartShopping,
  faCodeCompare,
  faGlobe,
  faMagnifyingGlass,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/Logo.png';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen } from '../../redux/slices/cartSlice';
import SearchPanel from '../SearchPanel/SearchPanel';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { createPortal } from 'react-dom';
import CartNotification from '../CartNotification/CartNotification';
import { changeLanguage } from '../../redux/slices/languageSlice';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { translationsAm, translationsEn, translationsRu } from '../../languages/langauges';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    ru: { translation: translationsRu },
    am: { translation: translationsAm },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const Header = () => {
  const { devices: comparingDevices } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpenSearchPanel, setisOpenSearchPanel] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const { isOpen: isOpenCart, devices: cartDevices } = useSelector((state) => state.cart);
  const { language, languagesList } = useSelector((state) => state.language);
  const [scrolling, setScrolling] = useState(false);
  const mounted = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (mounted.current) {
      window.location.reload();
    }
    mounted.current = true;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(comparingDevices));
  }, [comparingDevices]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartDevices));
  }, [cartDevices]);

  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(language));
    i18n.changeLanguage(language.title);
  }, [language]);

  useEffect(() => {
    setisOpenSearchPanel(false);
    setIsOpenMenu(false);
  }, [location]);

  useEffect(() => {
    const event = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', event);

    return () => {
      window.removeEventListener('scroll', event);
    };
  }, []);

  const onChangeLanguage = (lan) => {
    dispatch(changeLanguage(lan));
  };

  return (
    <>
      <div className="container">
        <div className={classes.top}>
          <ul className={classes.flex}>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+37491751900">
                <span>+ (374) 91 75 19 00</span>
              </a>
            </li>
            <li onClick={() => setIsOpenLanguage((isOpen) => !isOpen)}>
              <FontAwesomeIcon icon={faGlobe} />
              <div className="select">{language.label}</div>
              <FontAwesomeIcon
                className={classes.angle}
                style={isOpenLanguage ? { transform: 'rotateX(180deg)' } : undefined}
                icon={faAngleDown}
              />
              {isOpenLanguage && (
                <ul className={classes.options}>
                  {languagesList.map((lan) => {
                    return lan.title === language.title ? undefined : (
                      <li key={lan.title} onClick={() => onChangeLanguage(lan)}>
                        {lan.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      <header className={scrolling ? classes.scrolling : undefined}>
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
                      {t('categories')}
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/about-us'}>
                      {t('about')}
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/credit-terms'}>
                      {t('terms')}
                    </NavLink>
                  </li>
                  <li className={classes.link}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : undefined)}
                      to={'/contacts'}>
                      {t('contacts')}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className={classes.btns}>
              <li className={classes.icon} onClick={() => setisOpenSearchPanel(true)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </li>
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
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to="/compare">
                  <FontAwesomeIcon icon={faCodeCompare} />
                </NavLink>
              </li>
              <li className={classes.icon}>
                <FontAwesomeIcon
                  icon={faBars}
                  className={isOpenMenu ? classes.active : undefined}
                  onClick={() => setIsOpenMenu((isOpenMenu) => !isOpenMenu)}
                />
              </li>
            </ul>
            <Cart />
            {isOpenMenu && (
              <ul className={classes.menu}>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'/categories'}>
                    {t('categories')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'/about-us'}>
                    {t('about')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'/credit-terms'}>
                    {t('terms')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                    to={'/contacts'}>
                    {t('contacts')}
                  </NavLink>
                </li>
              </ul>
            )}
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
                setisOpenSearchPanel(false);
              }
            }}>
            <SearchPanel />
          </div>,
          document.body,
        )}
    </>
  );
};

export default Header;
