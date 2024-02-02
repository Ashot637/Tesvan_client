import classes from './intro.module.scss';
import { Link } from 'react-router-dom';
import axios from '../../helpers/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(({ data }) => data);

const Intro = () => {
  const { data: slides } = useSWR('/img/header', fetcher, { suspense: true });

  return (
    <>
      {slides && (
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
          {slides?.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <Link
                  to={`/categories/${slide.device.categorie.title_en.toLowerCase()}/${
                    slide.device.id
                  }`}>
                  <div className={classes.slide}>
                    <div className={classes.text}>
                      <b>{slide.title}</b>
                      <span>{slide.description}</span>
                    </div>
                    <div className={classes.img}>
                      <img
                        src={'https://tesvanelectronics.am/service/' + slide.img}
                        alt="Slide"
                        width={978}
                        height={514}
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
