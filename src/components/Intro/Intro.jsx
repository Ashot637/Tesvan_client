import React, { useEffect, useState } from 'react';
import classes from './intro.module.scss';
import { Link } from 'react-router-dom';
import axios from '../../helpers/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';

const Intro = () => {
  const [slides, setSlides] = useState();
  const [devices, setDevices] = useState();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    axios
      .get('/img/header')
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
    <>
      {slides && devices && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          className={classes.slider}>
          {slides.map((slide, i) => {
            return (
              <SwiperSlide key={slide.id}>
                <Link
                  to={
                    devices[i] &&
                    categories.find((c) => c.id === devices[i].categorieId) &&
                    '/categories/' +
                      categories.find((c) => c.id === devices[i].categorieId).title.toLowerCase() +
                      '/' +
                      devices[i].id
                  }>
                  <div className={classes.slide}>
                    <div className={classes.text}>
                      <b>{slide.title}</b>
                      <span>{slide.description}</span>
                    </div>
                    <div className={classes.img}>
                      <img
                        src={'https://tesvan-electronics.onrender.com/' + slide.img}
                        alt="Slide"
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default Intro;
