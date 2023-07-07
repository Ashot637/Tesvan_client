import React, { useState, useCallback, useEffect } from 'react';
import classes from './categoriesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoriesSlider = () => {
  const [swiperRef, setSwiperRef] = useState();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.categories}>
      <button onClick={handlePrevious}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="container">
        <Swiper onSwiper={setSwiperRef} slidesPerView={5} spaceBetween={5}>
          {categories.map((categorie, i) => {
            return (
              <SwiperSlide key={i}>
                <Link className={classes.slide} to={`/categories/${categorie.title.toLowerCase()}`}>
                  <img src={'http://localhost:8080/' + categorie.img} alt="Slide" />
                  <span>{categorie.title}</span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <button onClick={handleNext}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default CategoriesSlider;
