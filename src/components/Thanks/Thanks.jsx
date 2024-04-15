import classes from "./thanks.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import axios from "../../helpers/axios";

const Thanks = ({ img, title, subtitle, btn }) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId && title === "confirmed") {
      axios.post("/orders/finish", { orderKey: orderId });
    }
  }, [searchParams, title]);

  const { t } = useTranslation();

  return (
    <div className={classes.thanks}>
      <div className="container">
        <div className={classes.block}>
          <img width={130} height={130} src={img} alt={title} />
          <div className={classes.title}>{t(title)}</div>
          <div className={classes.subtitle}>{t(subtitle)}</div>
          <Link to="/">
            <button className={classes.btn}>{t(btn)}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
