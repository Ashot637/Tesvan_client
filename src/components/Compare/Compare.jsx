import React, { useEffect, useState } from "react";
import classes from "./compare.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompareingDevcies,
  removeAllComparing,
} from "../../redux/slices/compareSlice";
import ComparingItems from "../ComparingItems/ComparingItems";
import { useTranslation } from "react-i18next";

const filters = [
  {
    id: 1,
    label: "all",
  },
  {
    id: 2,
    label: "differnces",
  },
];

const Compare = () => {
  const dispatch = useDispatch();
  const { devices, devicesIds } = useSelector((state) => state.compare);

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCompareingDevcies({ ids: devicesIds }));
  }, []);

  useEffect(() => {
    let arr = devices.map((device) => device.categorie.title);
    setCategories([...new Set(arr)]);
  }, [devices]);

  return (
    <div className={classes.compare}>
      <div className={classes.top}>
        <h2>{t("compare")}</h2>
        <ul className={classes.filters}>
          {filters.map((filter) => {
            return (
              <li
                key={filter.id}
                onClick={() => setSelected(filter.id)}
                className={
                  selected === filter.id ? classes.selected : undefined
                }
              >
                {t(filter.label)}
              </li>
            );
          })}
        </ul>
        <p onClick={() => dispatch(removeAllComparing())}>{t("deleteAll")}</p>
      </div>
      {!devicesIds.length ? (
        <h3>{t("emptyCompare")}</h3>
      ) : (
        categories.length &&
        categories.map((categorie) => {
          return (
            <React.Fragment key={categorie}>
              <ComparingItems
                devices={devices.filter(
                  (device) => device.categorie.title === categorie
                )}
                title={categorie}
                isFilterMode={selected === 2}
              />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default Compare;
