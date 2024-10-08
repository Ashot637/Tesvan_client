import classes from "./footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faClock,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer>
        <div className="container" style={{ overflowX: "hidden" }}>
          <div className={classes.inner}>
            <ul className={classes.nav}>
              <li className={classes.link}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to={"/categories"}
                >
                  {t("categories")}
                </NavLink>
              </li>
              <li className={classes.link}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to={"/about-us"}
                >
                  {t("about-us")}
                </NavLink>
              </li>
              <li className={classes.link}>
                <NavLink
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to={'/credit-terms'}>
                  {t('credit-terms')}
                </NavLink>
                {/* <span>{t("credit-terms")}</span> */}
              </li>
              <li className={classes.link}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to={"/contacts"}
                >
                  {t("contacts")}
                </NavLink>
              </li>
            </ul>
            <div className={classes.logo}>
              <img
                src={"/img/full-logo.png"}
                width={46}
                height={62.27}
                alt="Logo"
              />
            </div>
            <ul className={classes.info}>
              <li>
                <div>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  {t("openDaysTop")}
                  <br />
                  {t("openDaysBottom")}
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <a href="tel:+37455491989">
                  <span>+ (374) 55 49 19 89</span>
                </a>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div>
                  {t("addressTop")}
                  <br />
                  {t("addressBottom")}
                </div>
              </li>
            </ul>
            <div className={classes.social}>
              <a
                href="https://www.facebook.com/tesvanllc"
                aria-label="Tesvan facebook"
                className={classes.socialLink}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://www.facebook.com/tesvanllc"
                aria-label="Tesvan Instagram"
                className={classes.socialLink}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/company/tesvan/"
                aria-label="Tesvan linkedIn"
                className={classes.socialLink}
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <Link to={"/privacy-policy"} className={classes.policy}>
              {t("privacy-policy")}
            </Link>
            <div
              className={classes.top}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FontAwesomeIcon icon={faAngleUp} />
              <span>{t("toTop")}</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <div className={classes.bottom}>
          <p>&#169; {t("allRights")}</p>
          <ul className={classes.payments}>
            <li>
              <img
                src={"/img/visa.png"}
                width={81}
                height={74}
                alt="Payment with Visa"
              />
            </li>
            <li>
              <img
                src={"/img/maestro.png"}
                width={75}
                height={45}
                alt="Payment with Maestro"
              />
            </li>
            <li>
              <img
                src={"/img/mastercard.png"}
                width={87}
                height={55}
                alt="Payment with Mastercard"
              />
            </li>
            <li>
              <img
                src={"/img/arca.png"}
                width={77}
                height={45}
                alt="Payment with Arca"
              />
            </li>
            <li>
              <img
                src={"/img/idramf.png"}
                width={60}
                height={49}
                alt="Payment with Idram"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
