import { useState, useEffect, memo } from "react";
import classes from "./simpleDevice.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeCompare,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import getPrice from "../../helpers/getPrice";
import { addDevice, toggleIsOpen } from "../../redux/slices/cartSlice";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { addDeviceComparing } from "../../redux/slices/compareSlice";
import { useTranslation } from "react-i18next";
import DeviceInfo from "../DeviceInfo/DeviceInfo";

const SimpleDevice = memo(({ device, inCart, inCompareList }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [img, setImg] = useState(device?.images[0]);
  const [count, setCount] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    if (device) {
      setImg(device.images[0]);
    }
  }, [device]);

  const onChangeCount = (i) => {
    setCount((count) => count + i);
  };

  const onAddToCart = (item) => {
    if (inCart) {
      dispatch(toggleIsOpen());
    } else {
      item = {
        ...item,
        count,
      };

      dispatch(addDevice(item));
    }
  };

  const navigateToOrderOutOfStock = () => {
    localStorage.setItem("outOfStockDeviceTitle", device.title);
    navigate("/contacts/make-order");
  };

  useEffect(() => {
    if (count !== 1) {
      setCount(1);
    }
  }, [location]);

  return (
    <div className={classes.simpleDevice}>
      <div className="container">
        <div className="inner">
          {device && (
            <div className={classes.device}>
              <div className={classes.top}>
                <span>{device.brand.title}</span>
                <FontAwesomeIcon
                  icon={faCodeCompare}
                  className={[
                    classes.compare,
                    inCompareList ? classes.selected : undefined,
                  ].join(" ")}
                  onClick={() => dispatch(addDeviceComparing(device.id))}
                />
              </div>
              <div className={classes.body}>
                <div className={classes.images}>
                  <div className={classes.mainImg}>
                    <img
                      src={"https://tesvanelectronics.am/service/" + img}
                      width={420}
                      height={283.78}
                      alt="Device"
                    />
                  </div>
                  <div className={classes.otherImages}>
                    {device.images.map((image) => {
                      return (
                        <div
                          key={Math.random()}
                          className={classes.otherImg}
                          onClick={() => setImg(image)}
                        >
                          <img
                            src={
                              "https://tesvanelectronics.am/service/" + image
                            }
                            width={110}
                            height={74.31}
                            alt="Device"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={classes.info}>
                  <div className={classes.mainInfo}>
                    <span className={classes.title}>{device.title}</span>
                    <span className={classes.codeId}>
                      {t("code")}: {device.code}
                    </span>
                    <span className={classes.price}>
                      {getPrice(device.price)} {t("amd")}
                    </span>
                    {/* <table className={classes.table}>
                      <thead className={classes.thead}>
                        <tr>
                          <td>120 000 {t("amd")}</td>
                          <td>120 000 {t("amd")}</td>
                          <td>120 000 {t("amd")}</td>
                        </tr>
                      </thead>
                      <tbody className={classes.tbody}>
                        <tr>
                          <td>12 {t("months")}</td>
                          <td>12 {t("months")}</td>
                          <td>12 {t("months")}</td>
                        </tr>
                      </tbody>
                    </table> */}
                    <span className={classes.line}></span>
                  </div>
                  <div className={classes.ordering}>
                    <div className={classes.prices}>
                      <div className={classes.cash}>
                        <b>{t("withCash")}</b>
                        <span>
                          {device.price.toLocaleString().replaceAll(",", " ")}{" "}
                          {t("amd")}
                        </span>
                      </div>
                      <div className={classes.credit}>
                        <b>{t("withCard")}</b>
                        <span>
                          ---------------
                          {/* {getPrice(device.price + 50000)} {t("amd")} */}
                        </span>
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
                        <span>{t("outOfStock")}</span>
                        <button onClick={() => navigateToOrderOutOfStock()}>
                          {t("contactUs")}
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className={classes.quantity}>
                          <div>{t("quantity")}</div>
                          <div className={classes.counter}>
                            <button
                              aria-label="Increment count"
                              className={classes.inc}
                              onClick={() => onChangeCount(1)}
                              disabled={count === device.quantity}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <p className={classes.count}>{count}</p>
                            <button
                              aria-label="Descrement count"
                              className={classes.dec}
                              onClick={() => onChangeCount(-1)}
                              disabled={count === 1}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                        </div>
                        <div className={classes.btns}>
                          <Link
                            to={{
                              pathname: location.pathname + "/make-order",
                              search: "?quantity=" + count,
                            }}
                          >
                            <button>{t("buy")}</button>
                          </Link>
                          <button onClick={() => onAddToCart(device)}>
                            {inCart ? t("addedToCart") : t("addToCart")}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.bottom}>
                <DeviceInfo info={device.info} />
              </div>
            </div>
          )}
          <div className={classes.related}>
            <span>{t("relateds")}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SimpleDevice;
