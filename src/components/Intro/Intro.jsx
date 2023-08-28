import React, { useEffect, useState } from 'react';
import classes from './intro.module.scss';
import { Link } from 'react-router-dom';
import axios from '../../helpers/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(({ data }) => data);

const Intro = () => {
  const { data: slides } = useSWR('/img/header', fetcher, { suspense: true });
  const [devices, setDevices] = useState(Array(slides?.length));
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (slides?.length) {
      let devicesIds = slides.map((slide) => slide.deviceId);
      axios.post('/devices/ids', { ids: devicesIds }).then(({ data }) => {
        setDevices(data);
      });
    }
  }, [slides]);

  return (
    <>
      {slides ? (
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          className={classes.slider}>
          {slides.map((slide, i) => {
            return (
              <SwiperSlide key={slide.id}>
                <Link
                  to={
                    devices[i] &&
                    categories.find((c) => c.id === devices[i]?.categorieId) &&
                    '/categories/' +
                      categories.find((c) => c.id === devices[i]?.categorieId).title.toLowerCase() +
                      '/' +
                      devices[i]?.id
                  }>
                  <div className={classes.slide}>
                    <div className={classes.text}>
                      <b>{slide.title}</b>
                      <span>{slide.description}</span>
                    </div>
                    <div className={classes.img}>
                      <img
                        src={'http://tesvan-electronics.onrender.com/' + slide.img}
                        alt="Slide"
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : undefined}
    </>
  );
};

const SuspenseTrigger = () => {
  throw new Promise(() => {});
};

export default Intro;
