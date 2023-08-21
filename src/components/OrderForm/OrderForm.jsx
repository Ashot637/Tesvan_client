import React, { useEffect, useState } from 'react';
import classes from './orderForm.module.scss';
import { useForm } from 'react-hook-form';
import axios from '../../helpers/axios';
import getPrice from '../../helpers/getPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Phone from '../Phone/Phone';
import { removeAll } from '../../redux/slices/cartSlice';

import cash from '../../img/cash.png';
import cards from '../../img/cards.png';
import terminal from '../../img/terminal.png';
import idram from '../../img/idram.png';

import delivery from '../../img/delivery.png';
import pickup from '../../img/pickup.png';
import { useTranslation } from 'react-i18next';

const paymentMethods = [
  {
    id: 1,
    label: 'cash',
    img: cash,
  },
  {
    id: 2,
    label: 'online',
    img: cards,
  },
  {
    id: 3,
    label: 'terminal',
    img: terminal,
  },
  {
    id: 4,
    label: 'Idram',
    img: idram,
  },
];

const deliveryMethods = [
  {
    id: 1,
    label: 'delivery',
    img: delivery,
  },
  {
    id: 2,
    label: 'pickup',
    img: pickup,
  },
];

const OrderForm = ({ device }) => {
  const dispatch = useDispatch();
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (device) {
      setDevices(device);
    } else {
      setDevices(cartDevices.filter((device) => device.quantity !== 0));
    }
  }, [id]);

  const onRemoveItem = (id) => {
    setDevices((devices) => devices.filter((device) => device.id !== id));
    if (devices.length - 1 === 0) {
      navigate('/');
    }
  };

  const onSubmit = (data) => {
    if (message) {
      data = { ...data, message };
    }
    const orderedDevices = [];
    devices.forEach((device) => {
      orderedDevices.push({
        id: device.id,
        count: device.count,
      });
    });
    data = {
      ...data,
      payment: paymentMethods.find((method) => method.id === paymentMethod).label,
      delivery: deliveryMethods.find((method) => method.id === deliveryMethod).label,
      devices: JSON.stringify(orderedDevices),
      phone,
    };
    axios.post('/orders', data).catch((e) => setIsError(true));
    if (isError) return;
    // if (!device) {
    //   dispatch(removeAll());
    // }
    reset();
    setMessage('');
    setIsError(false);
    navigate('/');
  };

  const totalPrice = devices.reduce((acc, device) => acc + device.price * device.count, 0);

  return (
    <div className={classes.orderForm}>
      <div className="container">
        <div className={classes.blocks}>
          <div className={classes.block}>
            <div className={classes.title}>{t('makeOrder')}</div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                    type="text"
                    autoComplete="off"
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
                    type="text"
                    autoComplete="off"
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
                  <label>{t('region')}</label>
                  <input
                    {...register('region', {
                      required: 'Required!',
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    type="text"
                    autoComplete="off"
                    className={errors?.region ? classes.invalid : undefined}
                  />
                  {errors?.region && <p>{t('required')}</p>}
                </div>
                <div className={classes.field}>
                  <label>{t('address')}</label>
                  <input
                    {...register('address', {
                      required: 'Required!',
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    type="text"
                    autoComplete="off"
                    className={errors?.address ? classes.invalid : undefined}
                  />
                  {errors?.address && <p>{t('required')}</p>}
                </div>
                <div className={[classes.field, classes.textarea].join(' ')}>
                  <label>{t('addComment')}</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={160}
                    autoComplete="off"
                    className={errors?.message ? classes.invalid : undefined}
                  />
                  <span className={classes.symbols}>{message.length}/160</span>
                </div>
              </div>
              {isError && <div className={classes.error}>Something went wrong. Try again.</div>}
              <div className={classes.payment}>
                <h3>{t('paymentMethod')}</h3>
                <span>{t('selectPaymentMethod')}</span>
                <ul className={classes.methods}>
                  {paymentMethods.map((method) => {
                    return (
                      <li
                        key={method.id}
                        className={[
                          classes.method,
                          paymentMethod === method.id ? classes.selected : undefined,
                        ].join(' ')}
                        onClick={() => setPaymentMethod(method.id)}>
                        <div className={classes.icon}>
                          <img src={method.img} alt="Payment method" />
                        </div>
                        <div>
                          <div className={classes.radio}></div>
                          <p>{t(method.label)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={classes.payment}>
                <h3>{t('deliveryMethod')}</h3>
                <span>{t('selectPaymentMethod')}</span>
                <ul className={classes.methods}>
                  {deliveryMethods.map((method) => {
                    return (
                      <li
                        key={method.id}
                        className={[
                          classes.method,
                          deliveryMethod === method.id ? classes.selected : undefined,
                        ].join(' ')}
                        onClick={() => setDeliveryMethod(method.id)}>
                        <div className={classes.icon}>
                          <img src={method.img} alt="Delivery method" />
                        </div>
                        <div>
                          <div className={classes.radio}></div>
                          <p>{t(method.label)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button type="submit" className={classes.btn} disabled={!isValid || !phoneValid}>
                {t('confirmOrder')}
              </button>
            </form>
          </div>
          <div className={classes.block}>
            <div className={classes.title}>{t('orderDetails')}</div>
            <table className={classes.devices}>
              <tbody>
                {devices.map((device) => {
                  return (
                    <tr key={device.id}>
                      <td className={classes.remove} onClick={() => onRemoveItem(device.id)}>
                        <FontAwesomeIcon icon={faClose} />
                      </td>
                      <td>
                        <div className={classes.deviceImg}>
                          <img
                            src={'http://localhost:8080/' + device?.images[0]}
                            alt="Device Order"
                          />
                        </div>
                      </td>
                      <td className={classes.name}>{device.title}</td>
                      <td>
                        <div className={classes.count}>{device.count}</div>
                      </td>
                      <td>
                        <b>{getPrice(device.price * device.count)} AMD</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={classes.devicesMobile}>
              {devices.map((device) => {
                return (
                  <div className={classes.deviceMobile} key={device.id}>
                    <div className={classes.remove} onClick={() => onRemoveItem(device.id)}>
                      <FontAwesomeIcon icon={faClose} />
                    </div>
                    <div className={classes.deviceMobileImg}>
                      <img src={'http://localhost:8080/' + device?.images[0]} alt="Device Order" />
                    </div>
                    <div className={classes.info}>
                      <span>{device.title}</span>
                      <div className={classes.count}>{device.count}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={classes.total}>
              <div className={classes.flex}>
                <span>{t('total')}</span>
                <span style={{ color: 'white' }}>{getPrice(totalPrice * 0.9)} AMD</span>
              </div>
              <div className={classes.flex}>
                <span>{t('productXpcs', { count: devices.length })}</span>
                <span>{getPrice(totalPrice)} AMD</span>
              </div>
              <div className={classes.flex}>
                <span>{t('discount')}</span>
                <span>-10%</span>
              </div>
              <div className={classes.flex}>
                <span>{t('delivery')}</span>
                <span>{t('free')}</span>
              </div>
            </div>
          </div>
          <Link to={'/'} className={classes.back}>
            {'<<'} {t('back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
