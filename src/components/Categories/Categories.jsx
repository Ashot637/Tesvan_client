import React from 'react';
import classes from './categories.module.scss';
import Title from '../../ui/Title/Title';
import { useSelector } from 'react-redux';
import img from '../../img/telephone.png';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <div className={classes.categories}>
      <Title title="Categories" />
      <div className="container">
        <div className={classes.inner}>
          {categories.map((categorie, i) => {
            return (
              <Link
                to={`/categories/${categorie.title.toLowerCase()}`}
                className={classes.categorie}
                key={i}>
                <img src={'http://localhost:8080/' + categorie.img} alt="Slide" />
                <span>{categorie.title}</span>
              </Link>
            );
          })}
          <div className={classes.categorie}>
            <img src={img} alt="Slide" />
            <span>Others</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
