import React, { useCallback, useState } from 'react';
import classes from './relatedItems.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const RelatedItems = ({ relateds }) => {
  const [swiperRef, setSwiperRef] = useState();
  const { brands } = useSelector((state) => state.brands);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.relateds}>
      <div className={classes.slider}>
        {relateds && (
          <>
            <button onClick={handlePrevious}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div className="container">
              <Swiper onSwiper={setSwiperRef} slidesPerView={4} spaceBetween={5}>
                {relateds.map((item) => {
                  return (
                    <SwiperSlide style={{ maxHeight: 480 }} key={item.id}>
                      <Card brands={brands} item={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <button onClick={handleNext}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </>
        )}
      </div>
      <div className={classes.grid}>
        {relateds &&
          relateds.map((item) => {
            return <Card brands={brands} key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
};

export default RelatedItems;
