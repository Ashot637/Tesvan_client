import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../../styles/form.module.scss';
import axios from '../../../../helpers/axios';

const EditNewCategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titleEn, setTitleEn] = useState('');
  const [titleAm, setTitleAm] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      axios.get('/categorie/' + id).then(({ data }) => {
        setTitleEn(data.title_en);
        setTitleAm(data.title_am);
        setTitleRu(data.title_ru);
        setImageUrl(data.img);
      });
    } else {
      setTitleEn('');
      setTitleAm('');
      setTitleRu('');
      setImageUrl('');
    }
  }, [id]);

  const onUploadFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event?.currentTarget?.files && event?.currentTarget?.files[0];
      formData.append('img', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch {
      alert('Failed to Upload an Image');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', imageUrl);
    formData.append('title_en', titleEn);
    formData.append('title_am', titleAm);
    formData.append('title_ru', titleRu);
    if (!id) {
      axios
        .post('/categories', formData)
        .then(({ data }) => {
          navigate('/admin/categories');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/categorie/' + id, formData)
        .then(({ data }) => {
          navigate('/admin/categories');
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
      <div className={classes.upload} onClick={() => fileRef.current.click()}>
        {imageUrl ? 'Change image' : 'Upload image'}
      </div>
      <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={onUploadFile} />
      {imageUrl && (
        <img src={'http://tesvan-electronics.onrender.com/' + imageUrl} height={150} alt="Device" />
      )}
      <button
        type="submit"
        className={classes.btn}
        disabled={!titleEn.trim() || !titleAm.trim() || !titleRu.trim() || !imageUrl}>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewCategorie;
