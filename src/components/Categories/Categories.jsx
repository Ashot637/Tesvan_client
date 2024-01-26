import React, { useEffect, useState } from 'react';
import classes from './categories.module.scss';
import Title from '../../ui/Title/Title';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../helpers/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  return (
    <div className={classes.categories}>
      <Title title={t('categories')} />
      <div className="container">
        <div className={classes.inner}>
          {categories.map((categorie, i) => {
            return (
              <Link
                to={`/categories/${categorie.title_en.toLowerCase()}`}
                className={classes.categorie}
                key={i}>
                <img
                  src={'http://134.209.251.128/service/' + categorie.img}
                  width={105}
                  height={105}
                  alt="Slide"
                />
                <span>{categorie.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
