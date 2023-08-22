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
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { addDeviceComparing } from '../../redux/slices/compareSlice';
import { useTranslation } from 'react-i18next';

const SimpleDevice = ({ device, relateds }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { brands } = useSelector((state) => state.brands);
  const { devicesIds: comparingDevices } = useSelector((state) => state.compare);
  const [swiperRef, setSwiperRef] = useState();
  const [moreOpen, setMoreOpen] = useState(false);
  const [img, setImg] = useState(device?.images[0]);
  const [count, setCount] = useState(1);
  const titles = ['Color', 'Memory', 'RAM'];
  const { t } = useTranslation();

  const onChangeCount = (i) => {
    setCount(count + i);
  };

  const onAddToCart = (item) => {
    item = {
      ...item,
      count,
    };

    dispatch(addDevice(item));
  };

  const navigateToOrderOutOfStock = () => {
    localStorage.setItem('outOfStockDeviceTitle', device.title);
    navigate('/contacts/order');
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
                <FontAwesomeIcon
                  icon={faCodeCompare}
                  className={[
                    classes.compare,
                    comparingDevices.find((id) => id === device.id) ? classes.selected : undefined,
                  ].join(' ')}
                  onClick={() => dispatch(addDeviceComparing(device.id))}
                />
              </div>
              <div className={classes.body}>
                <div className={classes.images}>
                  <div className={classes.mainImg}>
                    <img src={'http://localhost:8080/' + img} alt="Device" />
                  </div>
                  <div className={classes.otherImages}>
                    {device.images.map((image) => {
                      return (
                        <div key={image} className={classes.otherImg} onClick={() => setImg(image)}>
                          <img src={'http://localhost:8080/' + image} alt="Device" />
                        </div>
                      );
                    })}
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
                          <td>12 {t('months')}</td>
                          <td>12 {t('months')}</td>
                          <td>12 {t('months')}</td>
                        </tr>
                      </tbody>
                    </table>
                    <span className={classes.line}></span>
                  </div>
                  <div className={classes.ordering}>
                    <div className={classes.prices}>
                      <div className={classes.cash}>
                        <b>{t('withCash')}</b>
                        <span>{device.price.toLocaleString().replaceAll(',', ' ')} AMD</span>
                      </div>
                      <div className={classes.credit}>
                        <b>{t('withCard')}</b>
                        <span>{getPrice(device.price + 50000)} AMD</span>
                      </div>
                    </div>
                    <div className={classes.line}></div>
                    <table className={classes.characteristics}>
                      <tbody>
                        {device.info &&
                          device.info.slice(0, 3).map((i) => {
                            return (
                              <tr key={i.id}>
                                <td>{i.title}</td>
                                <td>{i.description}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    {device?.quantity !== 0 && <div className={classes.line} />}

                    {device?.quantity === 0 ? (
                      <div className={classes.out}>
                        <span>{t('outOfStock')}</span>
                        <button onClick={() => navigateToOrderOutOfStock()}>
                          {t('contactUs')}
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className={classes.quantity}>
                          <div>{t('quantity')}</div>
                          <div className={classes.counter}>
                            <button
                              className={classes.inc}
                              onClick={() => onChangeCount(1)}
                              disabled={count === device.quantity}>
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <p className={classes.count}>{count}</p>
                            <button
                              className={classes.dec}
                              onClick={() => onChangeCount(-1)}
                              disabled={count === 1}>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                        </div>
                        <div className={classes.btns}>
                          <Link
                            to={{
                              pathname: location.pathname + '/order',
                              search: '?quantity=' + count,
                            }}>
                            <button>{t('buy')}</button>
                          </Link>
                          <button onClick={() => onAddToCart(device)}>{t('addToCart')}</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.bottom}>
                <div
                  className={classes.more}
                  onClick={() => setMoreOpen((moreOpen) => !moreOpen)}
                  style={moreOpen ? { filter: 'grayscale(0.5)' } : undefined}>
                  {t('moreInformation')}
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
            <span>{t('relateds')}</span>
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

export default SimpleDevice;
