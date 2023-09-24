import React from "react";
import classes from "./aboutUs.module.scss";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.about}>
      <div className="container">
        <div className={classes.inner}>
          <div className={[classes.subtitle, classes.mobile].join(" ")}>
            {t("aboutUsBottom")}
            <br />
            <br />
            {t("aboutUsEnding")}
          </div>
          <img
            width={587}
            height={640}
            src={"/img/about-us.webp"}
            className={classes.img}
            alt="About Us"
          />
          <div className={classes.text}>
            <span className={classes.title}>{t("about-us")}</span>
            <div className={classes.subtitle}>
              {t("aboutUsTop")}
              <br />
              <br />
              <p>
                {t("aboutUsBottom")}
                <br />
                <br />
                {t("aboutUsEnding")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
