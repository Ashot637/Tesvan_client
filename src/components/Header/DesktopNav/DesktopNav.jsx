import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classes from "../header.module.scss";
import SearchPanel from "../../SearchPanel/SearchPanel";
import { useTranslation } from "react-i18next";

const DesktopNav = memo(() => {
  const { t } = useTranslation();

  return (
    <div className={classes.nav}>
      <SearchPanel />
      <nav>
        <ul className={classes.links}>
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
            {/* <NavLink
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              to={'/credit-terms'}>
              {t('credit-terms')}
            </NavLink> */}
            <span>{t("credit-terms")}</span>
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
      </nav>
    </div>
  );
});

export default DesktopNav;
