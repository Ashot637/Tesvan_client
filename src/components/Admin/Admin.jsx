import React from 'react';
import classes from './admin.module.scss';
import { NavLink, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className={classes.admin}>
      <div className="container">
        <div className={classes.inner}>
          <ul className={classes.links}>
            <li>
              <NavLink
                to={'add-device'}
                defaultChecked
                className={({ isActive }) => (isActive ? classes.active : undefined)}>
                Device
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'add-brand'}
                className={({ isActive }) => (isActive ? classes.active : undefined)}>
                Brand
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'add-categorie'}
                className={({ isActive }) => (isActive ? classes.active : undefined)}>
                Categorie
              </NavLink>
            </li>
          </ul>
          <div className={classes.body}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
