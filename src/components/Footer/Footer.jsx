import React, { useEffect, useState } from 'react';
import classes from './footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import logo from '../../img/Logo.png';
import visa from '../../img/visa.png';
import maestro from '../../img/maestro.png';
import mastercard from '../../img/mastercard.png';
import arca from '../../img/arca.png';
import idram from '../../img/idramf.png';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [_, rerender] = useState();

  useEffect(() => {
    rerender('');
  }, []);

  return (
    <>
      <footer>
        <div className="container" style={{ overflowX: 'hidden' }}>
          <div className={classes.inner}>
            <ul className={classes.nav}>
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
                  {t('about-us')}
                </NavLink>
              </li>
              <li className={classes.link}>
                <NavLink
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to={'/credit-terms'}>
                  {t('credit-terms')}
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
            <div className={classes.logo}>
              <img src={logo} width={46} alt="Logo" />
            </div>
            <ul className={classes.info}>
              <li>
                <div>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  {t('openDaysTop')}
                  <br />
                  {t('openDaysBottom')}
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <a href="tel:+37491751900">
                  <span>+ (374) 91 75 19 00</span>
                </a>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  {t('addressTop')}
                  <br />
                  {t('addressBottom')}
                </div>
              </li>
            </ul>
            <div className={classes.social}>
              <a href="/" className={classes.socialLink}>
                <svg
                  width="21"
                  height="15"
                  viewBox="0 0 21 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.2651 8.6842C15.3074 8.64985 14.3914 8.2836 13.6741 7.64819L13.867 6.74316L13.8751 6.71021C14.0471 5.74621 14.5911 4.12817 16.2651 4.12817C16.8692 4.12817 17.4486 4.3682 17.8758 4.79541C18.303 5.22262 18.5431 5.80203 18.5431 6.40619C18.5431 7.01035 18.303 7.58976 17.8758 8.01697C17.4486 8.44418 16.8692 8.6842 16.2651 8.6842ZM16.2651 1.81915C15.2133 1.8355 14.1983 2.20851 13.3862 2.87708C12.5741 3.54564 12.0131 4.47017 11.7951 5.49921C10.8032 3.96246 10.0403 2.28961 9.53006 0.533203H7.23005V6.5332C7.23005 7.10156 7.00427 7.64663 6.60238 8.04852C6.20049 8.45041 5.65541 8.67615 5.08705 8.67615C4.51869 8.67615 3.97362 8.45041 3.57173 8.04852C3.16984 7.64663 2.94406 7.10156 2.94406 6.5332V0.533203H0.644055V6.5332C0.635215 7.1226 0.743661 7.70784 0.963101 8.25494C1.18254 8.80204 1.50859 9.30004 1.92227 9.71997C2.33595 10.1399 2.82901 10.4734 3.37275 10.701C3.9165 10.9286 4.50008 11.0458 5.08955 11.0458C5.67902 11.0458 6.2626 10.9286 6.80635 10.701C7.3501 10.4734 7.84315 10.1399 8.25683 9.71997C8.67051 9.30004 8.99656 8.80204 9.216 8.25494C9.43544 7.70784 9.54389 7.1226 9.53505 6.5332V5.52716C9.98667 6.49129 10.5441 7.40223 11.197 8.24316L9.78704 14.8822H12.143L13.164 10.0672C14.0862 10.6746 15.1658 10.9993 16.27 11.0012C17.4871 11.0012 18.6544 10.5177 19.515 9.6571C20.3756 8.7965 20.8591 7.62925 20.8591 6.41217C20.8591 5.19509 20.3756 4.02784 19.515 3.16724C18.6544 2.30663 17.4871 1.82318 16.27 1.82318L16.2651 1.81915Z"
                    fill="#F4B41A"
                  />
                </svg>
              </a>
              <a href="/" className={classes.socialLink}>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="/" className={classes.socialLink}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <div
              className={classes.top}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <FontAwesomeIcon icon={faAngleUp} />
              <span>{t('toTop')}</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <div className={classes.bottom}>
          <p>&#169; 2022 The Content Folk All rights reserved</p>
          <ul className={classes.payments}>
            <li>
              <img src={visa} alt="Payment with Visa" />
            </li>
            <li>
              <img src={maestro} alt="Payment with Maestro" />
            </li>
            <li>
              <img src={mastercard} alt="Payment with Mastercard" />
            </li>
            <li>
              <img src={arca} alt="Payment with Arca" />
            </li>
            <li>
              <img src={idram} alt="Payment with Idram" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
