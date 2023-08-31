import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../helpers/axios';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const onDeleteOrder = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/orders/' + id).then(({ data }) => {
        setOrders((orders) => orders.filter((order) => order.id !== id));
      });
    }
  };

  const navigateToOrder = (id) => {
    navigate(String(id));
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'3%'}>Id</td>
          <td width={'12%'}>Name</td>
          <td width={'12%'}>Surname</td>
          <td width={'12%'}>Email</td>
          <td width={'12%'}>Phone</td>
          <td width={'12%'}>Payment</td>
          <td width={'12%'}>Delivery</td>
          <td width={'3%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <td onClick={() => navigateToOrder(order.id)}>{order.id}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.name}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.surname}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.email}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.phone}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.payment}</td>
              <td onClick={() => navigateToOrder(order.id)}>{order.delivery}</td>
              <td onClick={() => onDeleteOrder(order.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminOrders;
