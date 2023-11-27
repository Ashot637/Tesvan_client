import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../../styles/form.module.scss';
import axios from '../../../helpers/axios';

const EditNewDeviceInfoCategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titleEn, setTitleEn] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [titleRu, setTitleRu] = useState('');

  useEffect(() => {
    if (id) {
      axios.get('/deviceInfoCategorie/' + id).then(({ data }) => {
        setTitleEn(data.title_en);
        setTitleAm(data.title_am);
        setTitleRu(data.title_ru);
      });
    } else {
      setTitleEn('');
      setTitleAm('');
      setTitleRu('');
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_en', titleEn);
    formData.append('title_am', titleAm);
    formData.append('title_ru', titleRu);
    if (!id) {
      axios
        .post('/deviceInfoCategories', formData)
        .then(({ data }) => {
          navigate('/admin/device-info-categorie');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/deviceInfoCategorie/' + id, formData)
        .then(({ data }) => {
          navigate('/admin/device-info-categorie');
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Categorie name (En)</label>
        <input
          type="text"
          className={classes.name}
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Categorie name (Am)</label>
        <input
          type="text"
          className={classes.name}
          value={titleAm}
          onChange={(e) => setTitleAm(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Categorie name (Ru)</label>
        <input
          type="text"
          className={classes.name}
          value={titleRu}
          onChange={(e) => setTitleRu(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className={classes.btn}
        disabled={!titleEn.trim() || !titleAm.trim() || !titleRu.trim()}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewDeviceInfoCategorie;
