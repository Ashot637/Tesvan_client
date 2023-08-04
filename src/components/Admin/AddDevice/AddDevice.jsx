import React, { useEffect, useRef, useState } from 'react';
import classes from '../admin.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../../redux/slices/brandSlice';
import axios from '../../../helpers/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const AddDevice = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPRice] = useState('');
  const [file, setFile] = useState();
  const fileRef = useRef();
  const [info, setInfo] = useState([]);

  const [brandId, setBrandId] = useState(1);
  const [categorieId, setCategorieId] = useState(1);
  const [typeId, setTypeId] = useState(1);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [isOpenBrands, setIsOpenBrands] = useState(false);
  const [isOpenTypes, setIsOpenTypes] = useState(false);
  const types = [
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

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

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

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onAddInfo = () => {
    setInfo((info) => [...info, { title: '', description: '', id: Date.now() }]);
  };

  const onDeleteInfo = (id) => {
    setInfo((info) => info.filter((i) => i.id !== id));
  };

  const onChangeInfo = (id, key, value) => {
    setInfo((info) => info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', file);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('oldPrice', oldPrice);
    formData.append('brandId', brandId);
    formData.append('categorieId', categorieId);
    formData.append('typeId', typeId);
    formData.append(
      'info',
      JSON.stringify(
        info
          .filter((i) => i.title.trim() && i.description.trim())
          .map((i) => {
            return { title: i.title, description: i.description };
          }),
      ),
    );
    axios
      .post('/devices', formData)
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
            type="number"
            className={classes.name}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label>Old price</label>
          <input
            type="number"
            className={classes.name}
            value={oldPrice}
            onChange={(e) => setOldPRice(e.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label>Categorie</label>
          <div
            className={classes.select}
            onClick={() => setIsOpenCategories((isOpenCategories) => !isOpenCategories)}>
            {categories.find((categorie) => categorie.id === categorieId) &&
              categories.find((categorie) => categorie.id === categorieId).title}
          </div>
          {isOpenCategories && (
            <div className={classes.options}>
              {categories.map((categorie) => {
                if (categorie.id === categorieId) return undefined;
                return (
                  <div
                    className={classes.select}
                    key={categorie.id}
                    onClick={() => onSelectCategorie(categorie.id)}>
                    {categorie.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={classes.field}>
          <label>Brand</label>
          <div
            className={classes.select}
            onClick={() => setIsOpenBrands((isOpenBrands) => !isOpenBrands)}>
            {brands.find((brand) => brand.id === brandId) &&
              brands.find((brand) => brand.id === brandId).title}
          </div>
          {isOpenBrands && (
            <div className={classes.options}>
              {brands.map((brand) => {
                if (brand.id === brandId) return undefined;
                return (
                  <div
                    className={classes.select}
                    key={brand.id}
                    onClick={() => onSelectBrand(brand.id)}>
                    {brand.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={classes.field}>
          <label>Type (not optional)</label>
          <div
            className={classes.select}
            onClick={() => setIsOpenTypes((isOpenTypes) => !isOpenTypes)}>
            {types.find((type) => type.id === typeId) &&
              types.find((type) => type.id === typeId).title}
          </div>
          {isOpenTypes && (
            <div className={classes.options}>
              {types.map((type) => {
                if (type.id === typeId) return undefined;
                return (
                  <div
                    className={classes.select}
                    key={type.id}
                    onClick={() => onSelectType(type.id)}>
                    {type.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={classes.infos}>
          {info.map((i) => {
            return (
              <div className={classes.info} key={i.id}>
                <div className={classes.field}>
                  <label>Info title</label>
                  <input
                    type="text"
                    onChange={(e) => onChangeInfo(i.id, 'title', e.target.value)}
                  />
                </div>
                <div className={classes.field}>
                  <label>Info description</label>
                  <input
                    type="text"
                    onChange={(e) => onChangeInfo(i.id, 'description', e.target.value)}
                  />
                </div>
                <FontAwesomeIcon
                  icon={faClose}
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => onDeleteInfo(i.id)}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.btn} onClick={onAddInfo}>
          Add info
        </div>
        <div className={classes.upload} onClick={() => fileRef.current.click()}>
          {file ? 'Change image' : 'Upload image'}
        </div>
        <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={onChangeFile} />
        <button
          type="submit"
          className={classes.btn}
          disabled={!title.trim() || !price || !oldPrice || !file}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDevice;
