import React, { useEffect, useState } from 'react';
import classes from './orderForm.module.scss';
import { useForm } from 'react-hook-form';
import img from '../../img/visa.png';
import axios from '../../helpers/axios';
import getPrice from '../../helpers/getPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const OrderForm = ({ device }) => {
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [choice, setChoice] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (device) {
      setDevices(device);
    } else {
      setDevices(cartDevices);
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
    const ids = [];
    devices.forEach((device) => {
      for (let i = 0; i < device.count; i++) {
        ids.push(device.id);
      }
    });
    data = { ...data, choice, devices: ids };
    axios.post('/orders', data);
    // reset();
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
            <div className={classes.title}>Make order</div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  <label>Region</label>
                  <input
                    {...register('region', {
                      required: 'Required!',
                    })}
                    type="text"
                  />
                </div>
                <div className={classes.field}>
                  <label>Delivery address</label>
                  <input
                    {...register('address', {
                      required: 'Required!',
                    })}
                    type="text"
                  />
                </div>
                <div className={classes.field}>
                  <label>Payment</label>
                  <div className={classes.radios}>
                    <div className={classes.radio}>
                      <input
                        type="radio"
                        id="online"
                        onClick={() => setChoice(0)}
                        name="payment"
                        defaultChecked
                      />
                      <label htmlFor="online">Online</label>
                    </div>
                    <div className={classes.radio}>
                      <input type="radio" id="cash" onClick={() => setChoice(1)} name="payment" />
                      <label htmlFor="cash">Cash in delivery</label>
                    </div>
                  </div>
                </div>
                <div className={classes.field}>
                  <label>Add comment (optional)</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={160}
                  />
                  <span className={classes.symbols}>{message.length}/160</span>
                </div>
              </div>
              {isError && <div className={classes.error}>Something went wrong. Try again.</div>}
              <ul className={classes.paymentMethods}>
                <li>
                  <img src={img} alt="Payment method" />
                </li>
                <li>
                  <img src={img} alt="Payment method" />
                </li>
                <li>
                  <img src={img} alt="Payment method" />
                </li>
                <li>
                  <img src={img} alt="Payment method" />
                </li>
                <li>
                  <img src={img} alt="Payment method" />
                </li>
              </ul>
              <button type="submit" className={classes.btn} onClick={() => setIsError(true)}>
                Confirm order
              </button>
            </form>
          </div>
          <div className={classes.block}>
            <div className={classes.title}>Order details</div>
            <table className={classes.devices}>
              <tbody>
                {devices.map((device) => {
                  return (
                    <tr key={device.id}>
                      <td className={classes.remove} onClick={() => onRemoveItem(device.id)}>
                        <FontAwesomeIcon icon={faClose} />
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
            <div className={classes.total}>
              <div className={classes.flex}>
                <span>Total for payment </span>
                <span style={{ color: 'white' }}>{getPrice(totalPrice * 0.9)} AMD</span>
              </div>
              <div className={classes.flex}>
                <span>TProduct, {devices.length} pcs </span>
                <span>{getPrice(totalPrice)} AMD</span>
              </div>
              <div className={classes.flex}>
                <span>Discount </span>
                <span>-10%</span>
              </div>
              <div className={classes.flex}>
                <span>Delivery</span>
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
