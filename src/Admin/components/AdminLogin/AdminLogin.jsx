import React, { useState } from 'react';
import classes from './adminLogin.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCode, fetchLogin } from '../../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numbers, setNumbers] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { admin, inValid, waitingCode, inValidCode } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    if (waitingCode) {
      dispatch(fetchCode({ numbers }));
    } else {
      dispatch(
        fetchLogin({
          email,
          password,
        }),
      );
    }
  };

  if (admin) {
    return <Navigate to={'/admin'} />;
  }

  return (
    <div className={classes.login}>
      <form onSubmit={onSubmit}>
        <div className={classes.field}>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.field}>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            className={classes.eye}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            icon={showPassword ? faEye : faEyeSlash}
          />
        </div>
        {waitingCode && (
          <div className={classes.field}>
            <label>6 Digit code</label>
            <input type="number" value={numbers} onChange={(e) => setNumbers(e.target.value)} />
          </div>
        )}
        {inValid && <p>Invalid email or password</p>}
        {inValidCode && <p>Invalid Code</p>}
        <button type="submit" disabled={!email.trim() || !password.trim()}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
