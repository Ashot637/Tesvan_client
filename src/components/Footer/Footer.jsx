import React from 'react';
import classes from './footer.module.scss';
import logo from '../../img/Logo.png';
import visa from '../../img/visa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className={classes.inner}>
            <table className={classes.table}>
              <thead>
                <tr className={classes.thead}>
                  <td>Category name</td>
                  <td>Category name</td>
                  <td>Category name</td>
                  <td>Category name</td>
                  <td>Category name</td>
                </tr>
              </thead>
              <tbody className={classes.tbody}>
                <tr>
                  <td valign="top">
                    <ul>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                    </ul>
                  </td>
                  <td valign="top" d>
                    <ul>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                    </ul>
                  </td>
                  <td valign="top">
                    <ul>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                    </ul>
                  </td>
                  <td valign="top">
                    <ul>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                    </ul>
                  </td>
                  <td valign="top">
                    <ul>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                      <li>Brand name</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={classes.logo}>
              <img src={logo} width={46} alt="Logo" />
            </div>
            <ul className={classes.info}>
              <li>
                <div>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  Mon-Sat 10:00 - 20:00 <br />
                  Sunday 11:00 - 20:00
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>+ (374) 91 75 19 00</div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  39 Nairyan St <br />
                  Sevan, Armenia
                </div>
              </li>
            </ul>
            <div className={classes.social}>
              <a href="/" className={classes.socialLink}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="/" className={classes.socialLink}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="/" className={classes.socialLink}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <div
              className={classes.top}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <FontAwesomeIcon icon={faAngleUp} />
              <span>Top</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <div className={classes.bottom}>
          <p>&#169; 2022 The Content Folk All rights reserved</p>
          <ul className={classes.payments}>
            <li>
              <img src={visa} alt="Payment method" />
            </li>
            <li>
              <img src={visa} alt="Payment method" />
            </li>
            <li>
              <img src={visa} alt="Payment method" />
            </li>
            <li>
              <img src={visa} alt="Payment method" />
            </li>
            <li>
              <img src={visa} alt="Payment method" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
