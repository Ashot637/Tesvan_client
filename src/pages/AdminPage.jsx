import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Admin from '../components/Admin/Admin';

const AdminPage = () => {
  const { user, status } = useSelector((state) => state.auth);

  if (
    ((!user || user.role !== 'ADMIN') && status !== 'loading' && status !== 'waiting') ||
    status === 'error'
  ) {
    return <Navigate to={'/'} />;
  }

  return <Admin />;
};

export default AdminPage;
