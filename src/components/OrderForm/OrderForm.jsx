import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./orderForm.module.scss";
import { useForm } from "react-hook-form";
import axios from "../../helpers/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Phone from "../Phone/Phone";
import { removeAll } from "../../redux/slices/cartSlice";

import { useTranslation } from "react-i18next";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Regions from "./Regions/Regions";
import OrderDetails from "./OrderDetails/OrderDetails";

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
  // {
  //   id: 3,
  //   label: "terminal",
  //   img: "/img/terminal.png",
  //   width: 50,
  //   height: 50,
  // },
  // {
  //   id: 4,
  //   label: "Idram",
  //   img: "/img/idram.png",
  //   width: 75,
  //   height: 23,
  // },
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
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const checkboxRef = useRef();
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState({
    id: 0,
    price: 0,
  });

  const totalPrice = useMemo(() => {
    return devices.reduce(
      (acc, device) => acc + device.price * device.count,
      0
    );
  }, [devices]);

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

  const onRemoveItem = useCallback(
    (id) => {
      setDevices((devices) => devices.filter((device) => device.id !== id));
      if (devices.length - 1 === 0) {
        navigate("/");
      }
    },
    [devices, navigate]
  );

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
      total: 1,
      // total: totalPrice + (deliveryMethod === 1 ? selectedRegion.price : 0),
      region: selectedRegion?.title_en,
      payment: paymentMethods.find((method) => method.id === paymentMethod)
        .label,
      delivery: deliveryMethods.find((method) => method.id === deliveryMethod)
        .label,
      devices: JSON.stringify(orderedDevices),
      phone,
      currency: "AMD",
      returnUrl: "https://tesvanelectronics.am/thanks",
      failUrl: "https://tesvanelectronics.am/reject",
    };
    axios
      .post("/orders", data)
      .then(({ data }) => {
        window.open(data.formUrl, "_self");
        if (!device) {
          dispatch(removeAll());
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
                <Regions
                  setSelectedRegion={setSelectedRegion}
                  selectedRegion={selectedRegion}
                />
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
          <OrderDetails
            devices={devices}
            deliveryMethod={deliveryMethod}
            selectedRegion={selectedRegion}
            totalPrice={totalPrice}
            onRemoveItem={onRemoveItem}
          />
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
