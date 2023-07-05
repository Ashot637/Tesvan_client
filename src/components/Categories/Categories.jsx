import React, { useEffect } from 'react';
import classes from './categories.module.scss';
import Title from '../../ui/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import img from '../../img/monitor.png';
import { Link } from 'react-router-dom';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className={classes.categories}>
      <Title title="Categories" />
      <div className="container">
        <div className={classes.inner}>
          {categories.map((categorie, i) => {
            return (
              <Link
                to={`/devices/${categorie.title.toLowerCase()}?id=${categorie.id}`}
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
