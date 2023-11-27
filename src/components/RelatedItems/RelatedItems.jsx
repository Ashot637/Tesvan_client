import React, { useCallback, useState } from 'react';
import classes from './relatedItems.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '../../hooks';

const RelatedItems = ({ relateds }) => {
  const { devicesIds: comparingDevices } = useSelector((state) => state.compare);
  const isBigger950 = useMediaQuery('(max-width: 950px)');
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.relateds}>
      {isBigger950 ? (
        <div className={classes.slider}>
          {relateds && (
            <>
              <button onClick={handlePrevious} aria-label="Previous">
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <div className="container">
                <Swiper onSwiper={setSwiperRef} slidesPerView={4} spaceBetween={5}>
                  {relateds.map((item) => {
                    return (
                      <SwiperSlide style={{ maxHeight: 480 }} key={item.id}>
                        <Card
                          item={item}
                          inCompareList={comparingDevices.includes(item.id)}
                          inCart={!!cartDevices.find((device) => device.id === item.id)}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <button onClick={handleNext} aria-label="Next">
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className={classes.grid}>
          {relateds &&
            relateds.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  inCompareList={comparingDevices.includes(item.id)}
                  inCart={!!cartDevices.find((device) => device.id === item.id)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default RelatedItems;
