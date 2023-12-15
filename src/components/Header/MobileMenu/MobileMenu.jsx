import React, { memo } from 'react';
import classes from '../header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../../hooks';

const MobileMenu = memo(() => {
  const [ref, isShow, setIsShow] = useClickOutside();
  const { t } = useTranslation();

  return (
    <li className={classes.icon} ref={ref}>
      <FontAwesomeIcon
        data-testid="mobileMenu-btn"
        icon={faBars}
        className={isShow ? classes.active : undefined}
        onClick={() => setIsShow((isShow) => !isShow)}
      />
      {isShow && (
        <ul className={classes.menu} data-testid="mobileMenu-menu">
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
              {t('about-us')}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              to={'/credit-terms'}>
              {t('credit-terms')}
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
    </li>
  );
});

export default MobileMenu;
