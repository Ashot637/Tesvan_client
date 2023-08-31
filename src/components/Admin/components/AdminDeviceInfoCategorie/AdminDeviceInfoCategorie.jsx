import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../helpers/axios';

const AdminDeviceInfoCategorie = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/deviceInfoCategories').then(({ data }) => setCategories(data));
  }, []);

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeletecategorie = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/deviceInfoCategorie/' + id).then(({ data }) => {
        setCategories((categories) => categories.filter((categorie) => categorie.id !== id));
      });
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'5%'}>Id</td>
          <td width={'20%'}>Title</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {categories.map((categorie) => {
          return (
            <tr key={categorie.id}>
              <td onClick={() => navigateToEdit(categorie.id)}>{categorie.id}</td>
              <td onClick={() => navigateToEdit(categorie.id)}>{categorie.title_en}</td>
              <td onClick={() => onDeletecategorie(categorie.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminDeviceInfoCategorie;
