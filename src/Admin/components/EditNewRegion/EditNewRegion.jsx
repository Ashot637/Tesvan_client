import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../../styles/form.module.scss';
import axios from '../../../helpers/axios';

const EditNewBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titles, setTitles] = useState({
    titleEn: '',
    titleAm: '',
    titleRu: '',
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (id) {
      axios.get('/region/' + id).then(({ data }) => {
        setTitles({
          titleEn: data.title_en,
          titleAm: data.title_am,
          titleRu: data.title_ru,
        });
        setPrice(data.price);
      });
    } else {
      setTitles({
        titleEn: '',
        titleAm: '',
        titleRu: '',
      });
      setPrice(0);
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title_en', titles.titleEn);
    formData.append('title_am', titles.titleAm);
    formData.append('title_ru', titles.titleRu);
    formData.append('price', price);
    if (!id) {
      axios
        .post('/regions', formData)
        .then(({ data }) => {
          navigate('/admin/regions');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/region/' + id, formData)
        .then(({ data }) => {
          navigate('/admin/regions');
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Region (En)</label>
        <input
          type="text"
          className={classes.name}
          value={titles.titleEn}
          onChange={(e) => setTitles((titles) => ({ ...titles, titleEn: e.target.value }))}
        />
      </div>
      <div className={classes.field}>
        <label>Region (Am)</label>
        <input
          type="text"
          className={classes.name}
          value={titles.titleAm}
          onChange={(e) => setTitles((titles) => ({ ...titles, titleAm: e.target.value }))}
        />
      </div>
      <div className={classes.field}>
        <label>Region (Ru)</label>
        <input
          type="text"
          className={classes.name}
          value={titles.titleRu}
          onChange={(e) => setTitles((titles) => ({ ...titles, titleRu: e.target.value }))}
        />
      </div>
      <div className={classes.field}>
        <label>Price</label>
        <input
          type="text"
          className={classes.name}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className={classes.btn}
        disabled={!titles.titleEn.trim() || !titles.titleAm.trim() || !titles.titleRu.trim()}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewBrand;
