import React, { useState, useCallback } from 'react';
import classes from './categoriesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoriesSlider = () => {
  const [swiperRef, setSwiperRef] = useState();
  const { categories } = useSelector((state) => state.categories);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.categories}>
      <div className="container">
        <div className={classes.flex}>
          <button onClick={handlePrevious} aria-label="Previus slide">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={5}
            slidesOffsetAfter={0}
            breakpoints={{
              200: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              850: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1270: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            spaceBetween={5}>
            {categories.map((categorie, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link
                    className={classes.slide}
                    to={`/categories/${categorie.title_en.toLowerCase()}`}>
                    <img
                      src={'http://localhost:8080/' + categorie.img}
                      alt="Slide"
                      height={105}
                      width={105}
                    />
                    <span>{categorie.title}</span>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className={classes.next} onClick={handleNext} aria-label="Next slide">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSlider;
