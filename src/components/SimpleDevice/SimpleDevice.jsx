import React, { useState, useCallback, useEffect } from 'react';
import classes from './simpleDevice.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodeCompare,
  faMinus,
  faPlus,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../Card/Card';
import getPrice from '../../helpers/getPrice';
import { addDevice } from '../../redux/slices/cartSlice';
import { useLocation } from 'react-router-dom';

const SimpleDevice = ({ device, relateds }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { brands } = useSelector((state) => state.brands);
  const [swiperRef, setSwiperRef] = useState();
  const [moreOpen, setMoreOpen] = useState(false);
  const [count, setCount] = useState(1);

  const onChangeCount = (i) => {
    if (count === 1 && i < 0) {
    } else {
      setCount(count + i);
    }
  };

  const onAddToCart = (item) => {
    item = {
      ...item,
      count,
    };

    dispatch(addDevice(item));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCount(1);
  }, [location]);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.simpleDevice}>
      <div className="container">
        <div className="inner">
          {device && (
            <div className={classes.device}>
              <div className={classes.top}>
                <span>
                  {brands.find((brand) => brand.id === device.brandId) &&
                    brands.find((brand) => brand.id === device.brandId).title}
                </span>
                <FontAwesomeIcon icon={faCodeCompare} className={classes.compare} />
              </div>
              <div className={classes.body}>
                <div className={classes.images}>
                  <div className={classes.mainImg}>
                    <img src={'http://localhost:8080/' + device.img} alt="Device" />
                  </div>
                  <div className={classes.otherImages}>
                    <div className={classes.otherImg}>
                      <img src={'http://localhost:8080/' + device.img} alt="Device" />
                    </div>
                    <div className={classes.otherImg}>
                      <img src={'http://localhost:8080/' + device.img} alt="Device" />
                    </div>
                    <div className={classes.otherImg}>
                      <img src={'http://localhost:8080/' + device.img} alt="Device" />
                    </div>
                    <div className={classes.otherImg}>
                      <img src={'http://localhost:8080/' + device.img} alt="Device" />
                    </div>
                  </div>
                </div>
                <div className={classes.info}>
                  <div className={classes.mainInfo}>
                    <span className={classes.title}>{device.title}</span>
                    <span className={classes.codeId}>Code {device.id}</span>
                    <span className={classes.price}>{getPrice(device.price)} AMD</span>
                    <table className={classes.table}>
                      <thead className={classes.thead}>
                        <tr>
                          <td>120 000 AMD</td>
                          <td>120 000 AMD</td>
                          <td>120 000 AMD</td>
                        </tr>
                      </thead>
                      <tbody className={classes.tbody}>
                        <tr>
                          <td>12 Months</td>
                          <td>12 Months</td>
                          <td>12 Months</td>
                        </tr>
                      </tbody>
                    </table>
                    <span className={classes.line}></span>
                  </div>
                  <div className={classes.ordering}>
                    <div className={classes.prices}>
                      <div className={classes.cash}>
                        <b>Cash</b>
                        {device.price.toLocaleString().replaceAll(',', ' ')} AMD
                      </div>
                      <div className={classes.card}>
                        <b>Card</b>
                        {getPrice(device.price + 50000)} AMD
                      </div>
                    </div>
                    <table className={classes.characteristics}>
                      <thead>
                        <tr>
                          <td>Memory</td>
                          <td>512 GB</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Memory</td>
                          <td>1 GB</td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>Midnight</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={classes.quantity}>
                      <div>Quantity</div>
                      <ul className={classes.counter}>
                        <li className={classes.inc} onClick={() => onChangeCount(1)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </li>
                        <li className={classes.count}>{count}</li>
                        <li className={classes.dec}>
                          <FontAwesomeIcon icon={faMinus} onClick={() => onChangeCount(-1)} />
                        </li>
                      </ul>
                    </div>
                    <div className={classes.btns}>
                      <button>Buy</button>
                      <button onClick={() => onAddToCart(device)}>Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.bottom}>
                <div
                  className={classes.more}
                  onClick={() => setMoreOpen((moreOpen) => !moreOpen)}
                  style={moreOpen ? { filter: 'grayscale(0.5)' } : undefined}>
                  More information
                </div>
                <table className={classes.moreInfo}>
                  <tbody>
                    {moreOpen &&
                      device.info.map((i) => {
                        return (
                          <tr key={i.id}>
                            <td>{i.title}</td>
                            <td>{i.description}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className={classes.related}>
            <span>Related Products</span>
          </div>
        </div>
      </div>
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
                    <SwiperSlide style={{ maxHeight: 462 }} key={item.id}>
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
    </div>
  );
};

export default SimpleDevice;
