import React, { useEffect, useRef, useState } from 'react';
import classes from './contacts.module.scss';
import { useForm } from 'react-hook-form';
import axios from '../../helpers/axios';
import Phone from '../Phone/Phone';
import { useLocation } from 'react-router-dom';

const Contacts = () => {
  const location = useLocation();
  const checkboxRef = useRef();
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [outOfStockDevice, setOutOfStockDevice] = useState();

  useEffect(() => {
    if (location.pathname.includes('/contacts/order')) {
      setOutOfStockDevice(localStorage.getItem('outOfStockDeviceTitle'));
      setFocus('message');
    }
  }, [location]);

  const onAcceptTerms = () => {
    checkboxRef.current.click();
    setChecked((checked) => !checked);
  };

  const onSubmit = (data) => {
    if (!checked) {
      return;
    }
    let formData = { ...data, phone };
    axios.post('/contacts', formData);
    reset();
    setChecked(false);
  };

  return (
    <div className={classes.contacts}>
      <div className="container">
        <div className={classes.inner}>
          <h3 className={classes.title}>Contact Us</h3>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {(!isValid || !checked || !phoneValid) && (
              <div className={classes.required}>All fields are required</div>
            )}
            <div className={classes.fields}>
              <div className={classes.field}>
                <label>Name</label>
                <input
                  {...register('name', {
                    required: 'Required!',
                  })}
                  type="text"
                  className={errors?.name ? classes.invalid : undefined}
                />
                {errors?.name && <p>This field is required.</p>}
              </div>
              <div className={classes.field}>
                <label>Surname</label>
                <input
                  {...register('surname', {
                    required: 'Required!',
                  })}
                  type="text"
                  className={errors?.surname ? classes.invalid : undefined}
                />
                {errors?.surname && <p>This field is required.</p>}
              </div>
              <div
                className={[
                  classes.field,
                  classes.phoneField,
                  !phoneValid && phone ? classes.fieldInvalid : undefined,
                ].join(' ')}>
                <label>Phone</label>
                <Phone phone={phone} setPhone={setPhone} setPhoneValid={setPhoneValid} />
                {!phoneValid && phone && <p>Please enter valid phone number.</p>}
              </div>
              <div className={classes.field}>
                <label>Email</label>
                <input
                  {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                      value:
                        /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/,
                      message: 'Invalid email address.',
                    },
                  })}
                  type="text"
                  className={errors?.email ? classes.invalid : undefined}
                />
                {errors?.email && <p>{errors.email.message}</p>}
              </div>
              <div className={classes.field}>
                <label>Message</label>
                <textarea
                  rows={4}
                  {...register('message', {
                    required: 'Required!',
                  })}
                  defaultValue={
                    outOfStockDevice ? 'I want to order ' + outOfStockDevice + ' ' : undefined
                  }
                  maxLength={160}
                  className={errors?.message ? classes.invalid : undefined}
                />
                {errors?.message && <p>This field is required.</p>}
                <span className={classes.symbols}>
                  {watch('message') ? watch('message').length : 0}/160
                </span>
              </div>
            </div>
            <div className={classes.terms}>
              <input type="checkbox" ref={checkboxRef} style={{ display: 'none' }} />
              <div className={classes.checkbox} onClick={onAcceptTerms}></div>
              Lorem ipsum <a href="/">Privacy Policy</a>
            </div>
            <button
              className={classes.btn}
              type="submit"
              disabled={!isValid || !checked || !phoneValid}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
