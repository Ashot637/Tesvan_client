import React from 'react';
import classes from './categories.module.scss';
import Title from '../../ui/Title/Title';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { categories } = useSelector((state) => state.categories);
  const { t } = useTranslation();

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
                  src={'http://localhost:8080/' + categorie.img}
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
