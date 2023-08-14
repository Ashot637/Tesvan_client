import React, { useEffect } from 'react';
import classes from './home.module.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../../../../redux/slices/authSlice';

const AdminHome = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { admin, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  if (
    !admin &&
    !location.pathname.includes('/login') &&
    status !== 'loading' &&
    status !== 'waiting'
  ) {
    return <Navigate to={'/admin/login'} />;
  }

  return (
    <main>
      {!location.pathname.includes('/login') && <AdminSidebar />}
      {location.pathname === '/admin' ? (
        <div className={classes.home}>
          <h1>
            Welcome to <span>Tesvan Admin</span>
          </h1>
        </div>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default AdminHome;
