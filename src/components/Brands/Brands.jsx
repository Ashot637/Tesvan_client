import React, { useState, useCallback, useEffect } from "react";
import classes from "./brands.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux/slices/brandSlice";
import { useTranslation } from "react-i18next";
import { removeAllFilters, setBrandId } from "../../redux/slices/devicesSlice";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const [swiperRef, setSwiperRef] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchBrands(0));
  }, []);

  const onNavigateToDevices = (id) => {
    navigate("/categories/notebooks");
    dispatch(removeAllFilters());
    dispatch(setBrandId(id));
  };

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className={classes.brands}>
      <h1 className={classes.title}>{t("brands")}</h1>
      <div className={classes.inner}>
        <button onClick={handlePrevious} aria-label="Previus slide">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="container">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={"auto"}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              470: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1239: {
                slidesPerView: 5,
              },
              1270: {
                slidesPerView: 6,
              },
            }}
          >
            {brands.map((brand, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    onClick={() => onNavigateToDevices(brand.id)}
                    className={classes.slide}
                  >
                    <img
                      src={"https://tesvanelectronics.am/service/" + brand.img}
                      height={100}
                      width={100}
                      alt="Brand"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <button onClick={handleNext} aria-label="Next slide">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Brands;
