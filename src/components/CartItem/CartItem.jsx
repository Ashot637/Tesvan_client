import React from 'react';
import classes from '../Cart/cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addDevice, minusDevice, removeDevice } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td className={classes.remove} onClick={() => dispatch(removeDevice(item.id))}>
        <FontAwesomeIcon icon={faClose} />
      </td>
      <td>
        <img src={'http://localhost:8080/' + item.img} alt="Cart item" width={90} />
      </td>
      <td className={classes.name}>{item.title}</td>
      <td>
        <ul className={classes.counter}>
          <li className={classes.inc} onClick={() => dispatch(addDevice(item))}>
            <FontAwesomeIcon icon={faPlus} />
          </li>
          <li className={classes.count}>{item.count}</li>
          <li className={classes.dec} onClick={() => dispatch(minusDevice(item.id))}>
            <FontAwesomeIcon icon={faMinus} />
          </li>
        </ul>
      </td>
      <td>
        <b>{getPrice(item.price * item.count)} AMD</b>
      </td>
    </tr>
  );
};

export default CartItem;
