import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { useNavigate } from 'react-router-dom';
import axios from '../../../../helpers/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminRegions = () => {
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/regions').then(({ data }) => setRegions(data));
  }, []);

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeleteRegion = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/region/' + id).then(({ data }) => {
        setRegions((region) => region.filter((region) => region.id !== id));
      });
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'5%'}>Id</td>
          <td width={'25%'}>Title (Eng)</td>
          <td width={'25%'}>Title (Arm)</td>
          <td width={'25%'}>Title (Ru)</td>
          <td width={'10%'}>Price</td>
          <td width={'5%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {regions.map((region) => {
          return (
            <tr key={region.id}>
              <td onClick={() => navigateToEdit(region.id)}>{region.id}</td>
              <td onClick={() => navigateToEdit(region.id)}>{region.title_en}</td>
              <td onClick={() => navigateToEdit(region.id)}>{region.title_am}</td>
              <td onClick={() => navigateToEdit(region.id)}>{region.title_ru}</td>
              <td onClick={() => navigateToEdit(region.id)}>{region.price}</td>
              <td onClick={() => onDeleteRegion(region.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminRegions;
