import React from 'react';
import classes from './slider.module.scss';
import iphone from '../../img/iphone.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {
  return (
    <div className={classes.slider}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        initialSlide={1}
        slidesPerView={2}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}>
        {[...Array(5)].map((_, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={classes.slide}>
                <div className={classes.info}>
                  <span className={classes.title}>Iphone 14 Pro</span>
                  <button>Buy</button>
                </div>
                <img src={iphone} alt="Slide" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
