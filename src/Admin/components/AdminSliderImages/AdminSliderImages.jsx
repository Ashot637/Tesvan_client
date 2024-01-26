import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../helpers/axios';

const AdminSliderImages = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/img/slider').then(({ data }) => setImages(data));
  }, []);

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeleteItem = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/img/slider/' + id).then(({ data }) => {
        setImages((images) => images.filter((img) => img.id !== id));
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
          <td width={'15%'}>Device id</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {images.map((img) => {
          return (
            <tr key={img.id}>
              <td onClick={() => navigateToEdit(img.id)}>{img.id}</td>
              <td onClick={() => navigateToEdit(img.id)}>
                <img src={'http://134.209.251.128/service/' + img.img} width={100} alt="img" />
              </td>
              <td onClick={() => navigateToEdit(img.id)}>{img.title}</td>
              <td onClick={() => navigateToEdit(img.id)}>{img.deviceId}</td>
              <td onClick={() => onDeleteItem(img.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminSliderImages;
