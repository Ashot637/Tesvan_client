import React from 'react';
import classes from './intro.module.scss';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import slide1 from '../../img/slide1.png';

const Intro = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className={classes.slider}>
      {[...Array(5)].map((_, i) => {
        return (
          <SwiperSlide key={i}>
            <Link to={'/categories/notebooks/1'}>
              <img className={classes.img} src={slide1} alt="Slide" />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Intro;
