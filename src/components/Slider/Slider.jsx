import classes from './slider.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from '../../helpers/axios';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(({ data }) => data);

const Slider = () => {
  const { data: slides } = useSWR('/img/slider', fetcher);
  const { t } = useTranslation();

  return (
    <div className={[classes.slider, 'phone-slider'].join(' ')}>
      {!!slides?.length && (
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
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <div className={classes.slide}>
                  <div className={classes.info}>
                    <span className={classes.title}>{slide.title}</span>
                    <Link
                      to={`/categories/${slide.device.categorie.title_en.toLowerCase()}/${
                        slide.device.id
                      }`}>
                      <button>{t('buy')}</button>
                    </Link>
                  </div>
                  <img
                    src={'https://tesvanelectronics.am/service/' + slide.img}
                    width={388}
                    height={387}
                    alt="Slide"
                  />
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
