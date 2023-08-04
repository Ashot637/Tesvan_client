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
import { useLocation, Link } from 'react-router-dom';
import { addDeviceComparing } from '../../redux/slices/compareSlice';

const SimpleDevice = ({ device, relateds }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { brands } = useSelector((state) => state.brands);
  const { devices: comparingDevices } = useSelector((state) => state.compare);
  const [swiperRef, setSwiperRef] = useState();
  const [moreOpen, setMoreOpen] = useState(false);
  const [images, setImages] = useState([
    { id: 1, url: '3be6065e-2a43-4d93-a36b-0ddfa84ee083.png' },
    { id: 2, url: '50453329-677b-49e8-8c4e-56fef39440d1.png' },
    { id: 3, url: '3be6065e-2a43-4d93-a36b-0ddfa84ee083.png' },
    { id: 4, url: '50453329-677b-49e8-8c4e-56fef39440d1.png' },
  ]);
  const [img, setImg] = useState(images[0]);
  const [count, setCount] = useState(1);
  const titles = ['Color', 'Memory', 'RAM'];

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
                    comparingDevices.find((devices) => devices.id === device.id)
                      ? classes.selected
                      : undefined,
                  ].join(' ')}
                  onClick={() => dispatch(addDeviceComparing(device))}
                />
              </div>
              <div className={classes.body}>
                <div className={classes.images}>
                  <div className={classes.mainImg}>
                    <img src={'http://localhost:8080/' + img.url} alt="Device" />
                  </div>
                  <div className={classes.otherImages}>
                    {images.map((i) => {
                      return (
                        <div key={i.id} className={classes.otherImg} onClick={() => setImg(i)}>
                          <img src={'http://localhost:8080/' + i.url} alt="Device" />
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
                        <span>{device.price.toLocaleString().replaceAll(',', ' ')} AMD</span>
                      </div>
                      <div className={classes.credit}>
                        <b>Credit</b>
                        <span>{getPrice(device.price + 50000)} AMD</span>
                      </div>
                    </div>
                    <div className={classes.line}></div>
                    <table className={classes.characteristics}>
                      <tbody>
                        {device.info &&
                          device.info.map((i, index) => {
                            let currentInfo = device.info.find(
                              (information) => information.title === titles[index],
                            );
                            return currentInfo ? (
                              <tr key={i.id}>
                                <td>{titles[index]}</td>
                                <td>{currentInfo.description}</td>
                              </tr>
                            ) : undefined;
                          })}
                      </tbody>
                    </table>
                    <div className={classes.line}></div>
                    {device?.quantity === 0 ? (
                      <div className={classes.out}>
                        <span>Out of stock</span>
                        <button>Contact us</button>
                      </div>
                    ) : (
                      <>
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
                          <Link to={location.pathname + '/order'}>
                            <button>Buy</button>
                          </Link>
                          <button onClick={() => onAddToCart(device)}>Add to cart</button>
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
