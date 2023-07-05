import React, { useRef, useState } from 'react';
import classes from './contacts.module.scss';
import { useForm } from 'react-hook-form';
import axios from '../../helpers/axios';

const Contacts = () => {
  const checkboxRef = useRef();
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onAcceptTerms = () => {
    checkboxRef.current.click();
    setChecked((checked) => !checked);
  };

  const onSubmit = (data) => {
    if (!message || !checked) {
      return;
    }
    let formData = { ...data, message };
    axios.post('/contacts', formData);
    reset();
    setMessage('');
    setChecked(false);
  };

  return (
    <div className={classes.contacts}>
      <div className="container">
        <div className={classes.inner}>
          <h3 className={classes.title}>Contact Us</h3>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {(!isValid || !message || !checked) && (
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
                />
              </div>
              <div className={classes.field}>
                <label>Surname</label>
                <input
                  {...register('surname', {
                    required: 'Required!',
                  })}
                  type="text"
                />
              </div>
              <div className={classes.field}>
                <label>Phone</label>
                <input
                  {...register('phone', {
                    required: 'Required!',
                  })}
                  type="number"
                />
              </div>
              <div className={classes.field}>
                <label>Email</label>
                <input
                  {...register('email', {
                    required: 'Required!',
                  })}
                  type="email"
                />
              </div>
              <div className={classes.field}>
                <label>Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={160}
                />
                <span className={classes.symbols}>{message.length}/160</span>
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
              disabled={!isValid || !message || !checked}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
