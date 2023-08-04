import React, { useState, useCallback, useEffect } from 'react';
import classes from './brands.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/slices/brandSlice';

const Brands = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const [swiperRef, setSwiperRef] = useState();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.brands}>
      <h1 className={classes.title}>Brands</h1>
      <div className={classes.inner}>
        <button onClick={handlePrevious}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="container">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={'auto'}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              470: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1239: {
                slidesPerView: 5,
              },
              1270: {
                slidesPerView: 6,
              },
            }}>
            {brands.map((brand, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className={classes.slide}>
                    <img src={'http://localhost:8080/' + brand.img} alt="Brand" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <button onClick={handleNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Brands;