import React, { useEffect, useRef, useState } from "react";
import classes from "./orderForm.module.scss";
import { useForm } from "react-hook-form";
import axios from "../../helpers/axios";
import getPrice from "../../helpers/getPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Phone from "../Phone/Phone";
import { removeAll } from "../../redux/slices/cartSlice";

import { useTranslation } from "react-i18next";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const paymentMethods = [
  {
    id: 1,
    label: "cash",
    img: "/img/cash.png",
    width: 50,
    height: 50,
  },
  {
    id: 2,
    label: "online",
    img: "/img/cards.png",
  },
  {
    id: 3,
    label: "terminal",
    img: "/img/terminal.png",
    width: 50,
    height: 50,
  },
  {
    id: 4,
    label: "Idram",
    img: "/img/idram.png",
    width: 75,
    height: 23,
  },
];

const deliveryMethods = [
  {
    id: 1,
    label: "delivery",
    img: "/img/delivery.png",
    width: 50,
    height: 50,
  },
  {
    id: 2,
    label: "pickup",
    img: "/img/pickup.png",
    width: 50,
    height: 50,
  },
];

const OrderForm = ({ device }) => {
  const dispatch = useDispatch();
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const checkboxRef = useRef();
  const [checked, setChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState({
    id: 0,
    price: 0,
  });
  const [regions, setRegions] = useState([]);
  const [searchedRegions, setSearchedRegions] = useState([]);
  const [isOpenRegion, setIsOpenRegion] = useState(false);
  const regionRef = useRef();
  const fetchRef = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (!regions.length && fetchRef.current) {
      axios.get("/regions").then(({ data }) => {
        setRegions([
          {
            id: 0,
            price: 0,
          },
          ...data,
        ]);
      });
    }
    fetchRef.current = true;
  }, [isOpenRegion]);

  useEffect(() => {
    if (device?.length) {
      if (!device[0].quantity) {
        navigate("/");
      }
      setDevices(device);
    } else {
      setDevices(cartDevices.filter((device) => device.quantity !== 0));
    }
    if (
      !device &&
      cartDevices.filter((device) => device.quantity === 0)?.length
    ) {
      navigate("/");
    }
  }, [id, cartDevices]);

  useEffect(() => {
    const closePopup = (e) => {
      if (!regionRef.current?.contains(e.target)) {
        setIsOpenRegion(false);
      }
    };
    if (isOpenRegion) {
      document.body.addEventListener("mousedown", closePopup);
    } else {
      document.body.removeEventListener("mousedown", closePopup);
    }

    return () => {
      document.body.removeEventListener("mousedown", closePopup);
    };
  }, [isOpenRegion]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setSearchedRegions(
        regions.filter((reg) =>
          reg?.title?.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  const onRemoveItem = (id) => {
    setDevices((devices) => devices.filter((device) => device.id !== id));
    if (devices.length - 1 === 0) {
      navigate("/");
    }
  };

  const onAcceptTerms = () => {
    checkboxRef.current.click();
    setChecked((checked) => !checked);
  };

  const onSubmit = (data) => {
    if (message) {
      data = { ...data, message };
    }
    const orderedDevices = [];
    devices.forEach((device) => {
      orderedDevices.push({
        id: device.id,
        count: device.count,
      });
    });
    data = {
      ...data,
      total: totalPrice + (deliveryMethod === 1 ? selectedRegion.price : 0),
      region: regions.find((reg) => reg.id === selectedRegion.id)?.title_en,
      payment: paymentMethods.find((method) => method.id === paymentMethod)
        .label,
      delivery: deliveryMethods.find((method) => method.id === deliveryMethod)
        .label,
      devices: JSON.stringify(orderedDevices),
      phone,
    };
    axios
      .post("/orders", data)
      .then(({ data }) => {
        if (data) {
          navigate("/");
          if (!device) {
            dispatch(removeAll());
          }
        }
      })
      .catch((e) => {
        if (e?.response?.status === 409) {
          NotificationManager.error("", t("lessQuantity"), 3000);
        } else {
          NotificationManager.error("", t("somethingWentWrong"), 2000);
        }
      });
    reset();
    setMessage("");
    setPhone("");
  };

  const totalPrice = devices.reduce(
    (acc, device) => acc + device.price * device.count,
    0
  );

  return (
    <div className={classes.orderForm}>
      <div className="container">
        <div className={classes.blocks}>
          <div className={classes.block}>
            <div className={classes.title}>{t("make-order")}</div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.fields}>
                <div className={classes.field}>
                  <label>{t("name")}</label>
                  <input
                    {...register("name", {
                      required: "Required!",
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    aria-label="Name"
                    type="text"
                    autoComplete="off"
                    className={errors?.name ? classes.invalid : undefined}
                  />
                  {errors?.name && <p>{t("required")}</p>}
                </div>
                <div className={classes.field}>
                  <label>{t("surname")}</label>
                  <input
                    {...register("surname", {
                      required: "Required!",
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    aria-label="Surname"
                    type="text"
                    autoComplete="off"
                    className={errors?.surname ? classes.invalid : undefined}
                  />
                  {errors?.surname && <p>{t("required")}</p>}
                </div>
                <div
                  className={[
                    classes.field,
                    classes.phoneField,
                    !phoneValid && phone ? classes.fieldInvalid : undefined,
                  ].join(" ")}
                >
                  <label>{t("phone")}</label>
                  <Phone
                    phone={phone}
                    setPhone={setPhone}
                    setPhoneValid={setPhoneValid}
                  />
                  {!phoneValid && phone && <p>{t("requiredPhone")}</p>}
                </div>
                <div className={classes.field}>
                  <label>{t("email")}</label>
                  <input
                    {...register("email", {
                      required: t("required"),
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: t("requiredEmail"),
                      },
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    aria-label="Email"
                    maxLength={60}
                    autoComplete="off"
                    type="text"
                    className={errors?.email ? classes.invalid : undefined}
                  />
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
                <div className={classes.field} ref={regionRef}>
                  <label>{t("region")}</label>
                  <div
                    className={[
                      classes.selectedOption,
                      isOpenRegion ? classes.opened : undefined,
                      selectedRegion?.id === 0 ? classes.lightGrey : undefined,
                    ].join(" ")}
                    onClick={() =>
                      setIsOpenRegion((isOpenRegion) => !isOpenRegion)
                    }
                  >
                    {selectedRegion?.id === 0
                      ? t("select")
                      : selectedRegion?.title}
                    <FontAwesomeIcon
                      icon={isOpenRegion ? faAngleUp : faAngleDown}
                    />
                  </div>
                  {isOpenRegion && (
                    <div className={classes.optionsHolder}>
                      {regions.length || searchedRegions.length ? (
                        <>
                          <div className={classes.searchPanel}>
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={classes.searchIcon}
                            />
                          </div>
                          <div className={classes.options}>
                            {[
                              ...(searchTerm.trim().length
                                ? searchedRegions
                                : regions),
                            ].map((reg) => {
                              if (reg.id === selectedRegion?.id || reg.id === 0)
                                return undefined;
                              return (
                                <div
                                  key={reg.id}
                                  onClick={() => {
                                    setSelectedRegion(reg);
                                    setIsOpenRegion(false);
                                  }}
                                  className={classes.option}
                                >
                                  {reg.title}
                                </div>
                              );
                            })}
                            {!!searchTerm.trim().length &&
                              !searchedRegions.length && (
                                <p>{t("nothingFound")}</p>
                              )}
                          </div>
                        </>
                      ) : (
                        <span className={classes.loader}></span>
                      )}
                    </div>
                  )}
                </div>
                <div className={classes.field}>
                  <label>{t("address")}</label>
                  <input
                    {...register("address", {
                      required: "Required!",
                      validate: (value) => {
                        return !!value.trim();
                      },
                    })}
                    aria-label="Address"
                    type="text"
                    autoComplete="off"
                    className={errors?.address ? classes.invalid : undefined}
                  />
                  {errors?.address && <p>{t("required")}</p>}
                </div>
                <div className={[classes.field, classes.textarea].join(" ")}>
                  <label>{t("addComment")}</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={160}
                    autoComplete="off"
                    aria-label="Comment"
                    className={errors?.message ? classes.invalid : undefined}
                  />
                  <span className={classes.symbols}>{message.length}/160</span>
                </div>
                <div className={classes.terms}>
                  <input
                    type="checkbox"
                    ref={checkboxRef}
                    style={{ display: "none" }}
                  />
                  <div className={classes.checkbox} onClick={onAcceptTerms}>
                    {checked && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={classes.check}
                      />
                    )}
                  </div>
                  <p>
                    <span>{t("agree")}</span>
                    <Link
                      to={"/privacy-policy"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("policy")}
                    </Link>
                  </p>
                </div>
              </div>
              <div className={classes.payment}>
                <h3>{t("paymentMethod")}</h3>
                <span>{t("selectPaymentMethod")}</span>
                <ul className={classes.methods}>
                  {paymentMethods.map((method) => {
                    return (
                      <li
                        key={method.id}
                        className={[
                          classes.method,
                          paymentMethod === method.id
                            ? classes.selected
                            : undefined,
                        ].join(" ")}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className={classes.icon}>
                          <img
                            src={method.img}
                            alt="Payment method"
                            width={method.width}
                            height={method.height}
                          />
                        </div>
                        <div>
                          <div className={classes.radio}></div>
                          <p>{t(method.label)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={classes.payment}>
                <h3>{t("deliveryMethod")}</h3>
                <span>{t("selectPaymentMethod")}</span>
                <ul className={classes.methods}>
                  {deliveryMethods.map((method) => {
                    return (
                      <li
                        key={method.id}
                        className={[
                          classes.method,
                          deliveryMethod === method.id
                            ? classes.selected
                            : undefined,
                        ].join(" ")}
                        onClick={() => setDeliveryMethod(method.id)}
                      >
                        <div className={classes.icon}>
                          <img
                            src={method.img}
                            alt="Delivery method"
                            width={method.width}
                            height={method.height}
                          />
                        </div>
                        <div>
                          <div className={classes.radio}></div>
                          <p>{t(method.label)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                type="submit"
                className={classes.btn}
                disabled={
                  !isValid || !phoneValid || !checked || !selectedRegion.id
                }
              >
                {t("confirmOrder")}
              </button>
            </form>
          </div>
          <div className={classes.block}>
            <div className={classes.title}>{t("orderDetails")}</div>
            <table className={classes.devices}>
              <tbody>
                {devices.map((device) => {
                  return (
                    <tr key={device.id}>
                      <td
                        className={classes.remove}
                        onClick={() => onRemoveItem(device.id)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </td>
                      <td>
                        <div className={classes.deviceImg}>
                          <img
                            src={"http://localhost:8080/" + device?.images[0]}
                            width={50}
                            height={33.8}
                            alt="Device Order"
                          />
                        </div>
                      </td>
                      <td className={classes.name}>{device.title}</td>
                      <td>
                        <div className={classes.count}>{device.count}</div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <b>
                          {getPrice(device.price * device.count)} {t("amd")}
                        </b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={classes.devicesMobile}>
              {devices.map((device) => {
                return (
                  <div className={classes.deviceMobile} key={device.id}>
                    <div
                      className={classes.remove}
                      onClick={() => onRemoveItem(device.id)}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </div>
                    <div className={classes.deviceMobileImg}>
                      <img
                        src={"http://localhost:8080/" + device?.images[0]}
                        width={78}
                        height={53}
                        alt="Device Order"
                      />
                    </div>
                    <div className={classes.info}>
                      <span>{device.title}</span>
                      <div className={classes.count}>{device.count}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={classes.total}>
              <div className={classes.flex}>
                <span>{t("total")}</span>
                <span style={{ color: "white" }}>
                  {getPrice(
                    totalPrice +
                      (deliveryMethod === 1 ? selectedRegion?.price : 0)
                  )}{" "}
                  {t("amd")}
                </span>
              </div>
              <div className={classes.flex}>
                <span>{t("productXpcs", { count: devices.length })}</span>
                <span>{getPrice(totalPrice)} AMD</span>
              </div>
              {deliveryMethod === 1 ? (
                <div className={classes.flex}>
                  <span>{t("delivery")}</span>
                  {selectedRegion && (
                    <span style={{ textAlign: "right" }}>
                      {selectedRegion.id === 0
                        ? t("selectRegion")
                        : selectedRegion.price === 0
                        ? t("free")
                        : getPrice(selectedRegion?.price) + " " + t("amd")}
                    </span>
                  )}
                </div>
              ) : (
                <div className={classes.flex}>
                  <span>{t("pickup")}</span>
                  <span>{t("free")}</span>
                </div>
              )}
            </div>
          </div>
          <Link to={"/"} className={classes.back}>
            {"<<"} {t("back")}
          </Link>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default OrderForm;
