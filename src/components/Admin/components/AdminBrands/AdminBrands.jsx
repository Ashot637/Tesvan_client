import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../helpers/axios';

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/brands').then(({ data }) => setBrands(data));
  }, []);

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeletebrand = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/brand/' + id).then(({ data }) => {
        setBrands((brands) => brands.filter((brand) => brand.id !== id));
      });
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'5%'}>Id</td>
          <td width={'10%'}>Image</td>
          <td width={'20%'}>Title</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => {
          return (
            <tr key={brand.id}>
              <td onClick={() => navigateToEdit(brand.id)}>{brand.id}</td>
              <td onClick={() => navigateToEdit(brand.id)}>
                <img src={'http://localhost:8080/' + brand.img} width={100} alt="brand" />
              </td>
              <td onClick={() => navigateToEdit(brand.id)}>{brand.title}</td>
              <td onClick={() => onDeletebrand(brand.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminBrands;
