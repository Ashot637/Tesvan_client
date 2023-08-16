import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../helpers/axios';

const AdminDevices = () => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/devices', { params: { limit: 5000 } }).then(({ data }) => setDevices(data));
    axios.get('/brands').then(({ data }) => setBrands(data));
    axios.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeleteDevice = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/device/' + id).then(({ data }) => {
        alert('Deleted');
        setDevices((devices) => devices.filter((device) => device.id !== id));
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
          <td width={'15%'}>Price</td>
          <td width={'15%'}>Categorie</td>
          <td width={'15%'}>Brand</td>
          <td width={'5%'}>Quantity</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => {
          return (
            <tr key={device.id}>
              <td onClick={() => navigateToEdit(device.id)}>{device.id}</td>
              <td onClick={() => navigateToEdit(device.id)}>
                <img src={'http://localhost:8080/' + device.images[0]} width={100} alt="Device" />
              </td>
              <td onClick={() => navigateToEdit(device.id)}>{device.title}</td>
              <td onClick={() => navigateToEdit(device.id)}>{device.price} AMD</td>
              <td onClick={() => navigateToEdit(device.id)}>
                {categories.find((categorie) => categorie.id === device.categorieId) &&
                  categories.find((categorie) => categorie.id === device.categorieId).title_en}
              </td>
              <td onClick={() => navigateToEdit(device.id)}>
                {brands.find((brand) => brand.id === device.brandId) &&
                  brands.find((brand) => brand.id === device.brandId).title_en}
              </td>
              <td onClick={() => navigateToEdit(device.id)}>{device.quantity}</td>
              <td onClick={() => onDeleteDevice(device.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminDevices;
