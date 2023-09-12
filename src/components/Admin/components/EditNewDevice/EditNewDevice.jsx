import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from '../../styles/form.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../Select/Select';
import axios from '../../../../helpers/axios';

const EditNewDevice = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deviceInfoCategories, setdeviceInfoCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const fileRef = useRef([]);
  const [info, setInfo] = useState([]);
  const [images, setImages] = useState([
    {
      id: 1,
      url: '',
    },
    {
      id: 2,
      url: '',
    },
    {
      id: 3,
      url: '',
    },
    {
      id: 4,
      url: '',
    },
  ]);

  const [brandId, setBrandId] = useState(1);
  const [categorieId, setCategorieId] = useState(1);
  const [typeId, setTypeId] = useState(0);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [isOpenBrands, setIsOpenBrands] = useState(false);
  const [isOpenTypes, setIsOpenTypes] = useState(false);
  const types = [
    {
      id: 0,
      title: 'None',
    },
    {
      id: 1,
      title: 'Sale',
    },
    {
      id: 2,
      title: 'New Collection',
    },
    {
      id: 3,
      title: 'Bestseller',
    },
  ];
  const langauges = ['Eng', 'Arm', 'Ru'];
  const [language, setLanguage] = useState(langauges[0]);

  useEffect(() => {
    axios.get('/brands').then(({ data }) => setBrands(data));
    axios.get('/categories').then(({ data }) => setCategories(data));
    axios.get('/deviceInfoCategories').then(({ data }) => setdeviceInfoCategories(data));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get('/device/' + id).then(({ data }) => {
        setCode(data.code);
        setTitle(data.title);
        setPrice(data.price);
        setOldPrice(data.oldPrice);
        setBrandId(data.brandId);
        setCategorieId(data.categorieId);
        setImages([
          {
            id: 1,
            url: data.images[0] || '',
          },
          {
            id: 2,
            url: data.images[1] || '',
          },
          {
            id: 3,
            url: data.images[2] || '',
          },
          {
            id: 4,
            url: data.images[3] || '',
          },
        ]);
        setTypeId(data.typeId);
        setQuantity(data.quantity);
        setInfo(data.info);
      });
    } else {
      onResetFields();
    }
  }, [id]);

  const onResetFields = () => {
    setCode('');
    setTitle('');
    setPrice('');
    setOldPrice('');
    setImages([
      {
        id: 1,
        url: '',
      },
      {
        id: 2,
        url: '',
      },
      {
        id: 3,
        url: '',
      },
      {
        id: 4,
        url: '',
      },
    ]);
    setQuantity(1);
    setInfo([]);
  };

  const onSelectCategorie = (id) => {
    setCategorieId(id);
    setIsOpenCategories(false);
  };

  const onSelectBrand = (id) => {
    setBrandId(id);
    setIsOpenBrands(false);
  };

  const onSelectType = (id) => {
    setTypeId(id);
    setIsOpenTypes(false);
  };

  const onAddInfo = () => {
    setInfo((info) => [
      ...info,
      {
        id: Date.now(),
        title_en: '',
        description_en: '',
        title_am: '',
        description_am: '',
        title_ru: '',
        description_ru: '',
        deviceInfoCategorieId: '',
      },
    ]);
  };

  const onDeleteInfo = (id) => {
    if (+id < 50000) {
      if (window.confirm('Are you sure?')) {
        axios.delete('/remove-info/' + id);
        setInfo((info) => info.filter((i) => i.id !== id));
      }
    } else {
      setInfo((info) => info.filter((i) => i.id !== id));
    }
  };

  const onChangeInfo = (id, key, value) => {
    setInfo((info) => info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const onUploadFile = async (event, id) => {
    try {
      const formData = new FormData();
      const file = event?.currentTarget?.files && event?.currentTarget?.files[0];
      formData.append('img', file);
      const { data } = await axios.post('/upload', formData);
      setImages((images) => images.map((image) => (image.id === id ? { ...data, id } : image)));
    } catch {
      alert('Failed to Upload an Image');
    }
  };

  const onRemoveFile = (id) => {
    setImages((images) => images.map((image) => (image.id === id ? { url: '', id } : image)));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'images',
      images.filter((image) => image.url).map((image) => image.url),
    );
    formData.append('code', code);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('oldPrice', oldPrice);
    formData.append('quantity', quantity);
    formData.append('brandId', brandId);
    formData.append('categorieId', categorieId);
    formData.append('typeId', typeId);
    formData.append(
      'info',
      JSON.stringify(
        info
          .filter(
            (i) =>
              i.title_en.trim() &&
              i.description_en.trim() &&
              i.title_am.trim() &&
              i.description_am.trim() &&
              i.title_ru.trim() &&
              i.description_ru.trim(),
          )
          .map((i) => {
            if (+i.id > 50000) {
              let { id, ...data } = i;
              return data;
            }
            return i;
          }),
      ),
    );
    if (!id) {
      axios
        .post('/devices', formData)
        .then(({ data }) => {
          onResetFields();
          navigate('/admin/devices');
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .patch('/device/' + id, formData)
        .then(({ data }) => {
          onResetFields();
          navigate('/admin/devices');
        })
        .catch((e) => console.log(e));
    }
  };

  const renderInfos = () => {
    let content;
    if (language === 'Eng') {
      content = info.map((i) => {
        return (
          <div key={i.id} className={classes.info}>
            <select onChange={(e) => onChangeInfo(i.id, 'deviceInfoCategorieId', e.target.value)}>
              {!i.deviceInfoCategorieId && <option hidden>Selcect</option>}
              {deviceInfoCategories.map((c) => {
                if (i.deviceInfoCategorieId === c.id) {
                  return (
                    <option selected key={c.id} value={c.id}>
                      {c.title_en}
                    </option>
                  );
                }
                return (
                  <option key={c.id} value={c.id}>
                    {c.title_en}
                  </option>
                );
              })}
            </select>
            <div className={classes.field}>
              <label>Info title (Eng)</label>
              <input
                type="text"
                value={i.title_en}
                onChange={(e) => onChangeInfo(i.id, 'title_en', e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Info description (Eng)</label>
              <input
                type="text"
                value={i.description_en}
                onChange={(e) => onChangeInfo(i.id, 'description_en', e.target.value)}
              />
            </div>
            <FontAwesomeIcon
              onClick={() => onDeleteInfo(i.id)}
              className={classes.removeInfo}
              icon={faClose}
            />
          </div>
        );
      });
    } else if (language === 'Ru') {
      content = info.map((i) => {
        return (
          <div key={i.id} className={classes.info}>
            <div className={classes.field}>
              <label>Info title (Ru)</label>
              <input
                type="text"
                value={i.title_ru}
                onChange={(e) => onChangeInfo(i.id, 'title_ru', e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Info description (Ru)</label>
              <input
                type="text"
                value={i.description_ru}
                onChange={(e) => onChangeInfo(i.id, 'description_ru', e.target.value)}
              />
            </div>
            <FontAwesomeIcon
              onClick={() => onDeleteInfo(i.id)}
              className={classes.removeInfo}
              icon={faClose}
            />
          </div>
        );
      });
    } else {
      content = info.map((i) => {
        return (
          <div key={i.id} className={classes.info}>
            <div className={classes.field}>
              <label>Info title (Arm)</label>
              <input
                type="text"
                value={i.title_am}
                onChange={(e) => onChangeInfo(i.id, 'title_am', e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Info description (Arm)</label>
              <input
                type="text"
                value={i.description_am}
                onChange={(e) => onChangeInfo(i.id, 'description_am', e.target.value)}
              />
            </div>
            <FontAwesomeIcon
              onClick={() => onDeleteInfo(i.id)}
              className={classes.removeInfo}
              icon={faClose}
            />
          </div>
        );
      });
    }
    return content;
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.field}>
        <label>Device Code</label>
        <input
          type="text"
          className={classes.name}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Device name</label>
        <input
          type="text"
          className={classes.name}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <div className={classes.field}>
        <label>Old price</label>
        <input
          type="text"
          className={classes.name}
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label>Quantity</label>
        <input
          type="text"
          className={classes.name}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Select
        state={isOpenCategories}
        setState={setIsOpenCategories}
        id={categorieId}
        items={categories}
        event={onSelectCategorie}
        title={'Categorie'}
      />
      <Select
        state={isOpenBrands}
        setState={setIsOpenBrands}
        id={brandId}
        items={brands}
        event={onSelectBrand}
        title={'Brand'}
      />
      <Select
        state={isOpenTypes}
        setState={setIsOpenTypes}
        id={typeId}
        items={types}
        event={onSelectType}
        title={'Type'}
      />
      {images.map((image) => {
        return (
          <Fragment key={image.id}>
            <div className={classes.imgsBtns}>
              <div className={classes.upload} onClick={() => fileRef.current[image.id].click()}>
                {image.url ? 'Change image' : 'Upload image'}
              </div>
              {image.url && (
                <div className={classes.upload} onClick={() => onRemoveFile(image.id)}>
                  Remove Img
                </div>
              )}
            </div>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={(el) => (fileRef.current[image.id] = el)}
              onChange={(e) => onUploadFile(e, image.id)}
            />
            {image.url && (
              <img src={'http://localhost:8080/' + image.url} height={150} alt="Device" />
            )}
          </Fragment>
        );
      })}
      <ul className={classes.languages}>
        {langauges.map((lan) => {
          return (
            <li
              className={language === lan ? classes.active : undefined}
              key={lan}
              onClick={() => setLanguage(lan)}>
              {lan}
            </li>
          );
        })}
      </ul>
      <div className={classes.infos}>{renderInfos()}</div>
      <div className={classes.addInfo} onClick={onAddInfo}>
        Add info
      </div>
      <button
        type="submit"
        className={classes.btn}
        disabled={
          !code.trim() ||
          !title.trim() ||
          !price ||
          (!oldPrice && oldPrice !== 0) ||
          images.filter((image) => image.url).length < 2 ||
          quantity < 0 ||
          !info.length ||
          !deviceInfoCategories.length
        }>
        {id ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default EditNewDevice;
