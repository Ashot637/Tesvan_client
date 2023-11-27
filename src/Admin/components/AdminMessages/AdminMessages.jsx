import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../helpers/axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/contacts').then(({ data }) => setMessages(data));
  }, []);

  const onDeleteMessage = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/contacts/' + id).then(({ data }) => {
        setMessages((messages) => messages.filter((message) => message.id !== id));
      });
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'5%'}>Id</td>
          <td width={'10%'}>Name</td>
          <td width={'10%'}>Surname</td>
          <td width={'10%'}>Email</td>
          <td width={'10%'}>Phone</td>
          <td width={'40%'}>Message</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => {
          return (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.name}</td>
              <td>{message.surname}</td>
              <td>{message.email}</td>
              <td>{message.phone}</td>
              <td>{message.message}</td>
              <td onClick={() => onDeleteMessage(message.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminMessages;
