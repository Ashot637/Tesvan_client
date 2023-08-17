import React, { useEffect, useRef, useState } from 'react';
import classes from './contacts.module.scss';
import { useForm } from 'react-hook-form';
import axios from '../../helpers/axios';
import Phone from '../Phone/Phone';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const [_, rerender] = useState();
  const { t } = useTranslation();

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

  useEffect(() => {
    rerender('');
  }, []);

  return (
    <div className={classes.contacts}>
      <div className="container">
        <div className={classes.inner}>
          <h3 className={classes.title}>{t('contactUs')}</h3>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {(!isValid || !checked || !phoneValid) && (
              <div className={classes.required}>{t('fieldsRequired')}</div>
            )}
            <div className={classes.fields}>
              <div className={classes.field}>
                <label>{t('name')}</label>
                <input
                  {...register('name', {
                    required: 'Required!',
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                  autoComplete="off"
                  type="text"
                  className={errors?.name ? classes.invalid : undefined}
                />
                {errors?.name && <p>{t('required')}</p>}
              </div>
              <div className={classes.field}>
                <label>{t('surname')}</label>
                <input
                  {...register('surname', {
                    required: 'Required!',
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                  autoComplete="off"
                  type="text"
                  className={errors?.surname ? classes.invalid : undefined}
                />
                {errors?.surname && <p>{t('required')}</p>}
              </div>
              <div
                className={[
                  classes.field,
                  classes.phoneField,
                  !phoneValid && phone ? classes.fieldInvalid : undefined,
                ].join(' ')}>
                <label>{t('phone')}</label>
                <Phone phone={phone} setPhone={setPhone} setPhoneValid={setPhoneValid} />
                {!phoneValid && phone && <p>{t('requiredPhone')}</p>}
              </div>
              <div className={classes.field}>
                <label>{t('email')}</label>
                <input
                  {...register('email', {
                    required: t('required'),
                    pattern: {
                      value:
                        /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/,
                      message: t('requiredEmail'),
                    },
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                  autoComplete="off"
                  type="text"
                  className={errors?.email ? classes.invalid : undefined}
                />
                {errors?.email && <p>{errors.email.message}</p>}
              </div>
              <div className={classes.field}>
                <label>{t('message')}</label>
                <textarea
                  rows={4}
                  {...register('message', {
                    required: 'Required!',
                    validate: (value) => {
                      return !!value.trim();
                    },
                  })}
                  autoComplete="off"
                  defaultValue={
                    outOfStockDevice ? 'I want to order ' + outOfStockDevice + ' ' : undefined
                  }
                  maxLength={160}
                  className={errors?.message ? classes.invalid : undefined}
                />
                {errors?.message && <p>{t('required')}</p>}
                <span className={classes.symbols}>
                  {watch('message') ? watch('message').length : 0}/160
                </span>
              </div>
            </div>
            <div className={classes.terms}>
              <input type="checkbox" ref={checkboxRef} style={{ display: 'none' }} />
              <div className={classes.checkbox} onClick={onAcceptTerms}></div>
              <a href="/">{t('policy')}</a>
            </div>
            <button
              className={classes.btn}
              type="submit"
              disabled={!isValid || !checked || !phoneValid}>
              {t('send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
