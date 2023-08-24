import React, { useEffect, useState } from 'react';
import classes from './slider.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import axios from '../../helpers/axios';

const Slider = () => {
  const [slides, setSlides] = useState();
  const [devices, setDevices] = useState();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    axios
      .get('/img/slider')
      .then(({ data }) => {
        setSlides(data);
        return data;
      })
      .then((data) => {
        let devicesIds = data.map((d) => d.deviceId);
        axios.post('/devices/ids', { ids: devicesIds }).then(({ data }) => {
          setDevices(data);
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={[classes.slider, 'phone-slider'].join(' ')}>
      {slides && devices && (
        <Swiper
          slidesPerView={2}
          spaceBetween={40}
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 1.4,
            },
            1000: {
              slidesPerView: 1.6,
            },
            1130: {
              slidesPerView: 1.8,
            },
            1260: {
              slidesPerView: 2,
            },
          }}
          loop={true}>
          {slides.map((slide, i) => {
            return (
              <SwiperSlide key={slide.id}>
                <div className={classes.slide}>
                  <div className={classes.info}>
                    <span className={classes.title}>{slide.title}</span>
                    <Link
                      to={
                        devices[i] &&
                        categories.find((c) => c.id === devices[i].categorieId) &&
                        '/categories/' +
                          categories
                            .find((c) => c.id === devices[i].categorieId)
                            .title.toLowerCase() +
                          '/' +
                          devices[i].id
                      }>
                      <button>Buy</button>
                    </Link>
                  </div>
                  <img src={'http://localhost:8080/' + slide.img} alt="Slide" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
