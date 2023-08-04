import React, { useRef, useState } from 'react';
import classes from '../admin.module.scss';
import axios from '../../../helpers/axios';

const AddCategorie = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();
  const fileRef = useRef();

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', file);
    formData.append('title', title);
    axios
      .post('/categories', formData)
      .then(({ data }) => {
        setTitle('');
        setFile(undefined);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={classes.add}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.field}>
          <label>Categorie name</label>
          <input
            type="text"
            className={classes.name}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.center}>
          <div className={classes.upload} onClick={() => fileRef.current.click()}>
            {file ? 'Change image' : 'Upload image'}
          </div>
          <button type="submit" className={classes.btn} disabled={!title.trim() || !file}>
            Add
          </button>
          <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={onChangeFile} />
        </div>
      </form>
    </div>
  );
};

export default AddCategorie;
