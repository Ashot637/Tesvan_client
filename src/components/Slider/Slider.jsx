import React from 'react';
import classes from './slider.module.scss';
import iphone from '../../img/iphone.png';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {
  return (
    <div className={[classes.slider, 'phone-slider'].join(' ')}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        slidesPerView={2}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}>
        {[...Array(5)].map((_, i) => {
          return (
            <SwiperSlide key={i}>
              <Link to="/categories/phones/49" className={classes.slide}>
                <div className={classes.info}>
                  <span className={classes.title}>Iphone 14 Pro</span>
                  <button>Buy</button>
                </div>
                <img src={iphone} alt="Slide" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
