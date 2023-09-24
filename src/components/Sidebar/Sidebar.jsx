import React, { memo, useCallback, useEffect, useState } from "react";
import classes from "./sidebar.module.scss";
import AccordionItem from "../AccordionItem/AccordionItem";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFilter,
  setBrandId,
  setActiveFilters,
  setMaxPrice,
  setMinPrice,
} from "../../redux/slices/devicesSlice";
import { useTranslation } from "react-i18next";
import { debounce } from "debounce";

const Sidebar = memo(() => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { brandIds, minPrice, maxPrice, activeFilters, filters } = useSelector(
    (state) => state.devices
  );
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  const { t } = useTranslation();

  const onSelectBrand = (id) => {
    dispatch(setBrandId(id));
  };

  const onSelectFilter = (title, description) => {
    if (activeFilters[title]?.includes(description)) {
      dispatch(
        removeFilter({
          title,
          description,
        })
      );
    } else {
      dispatch(
        setActiveFilters({
          title,
          description,
        })
      );
    }
  };

  const debouncedMaxPriceChange = useCallback(
    debounce((maxValue) => {
      dispatch(setMaxPrice(maxValue));
    }, 750),
    []
  );

  const debouncedMinPriceChange = useCallback(
    debounce((minValue) => {
      dispatch(setMinPrice(minValue));
    }, 750),
    []
  );

  useEffect(() => {
    debouncedMaxPriceChange(max);
  }, [max, debouncedMaxPriceChange]);

  useEffect(() => {
    debouncedMinPriceChange(min);
  }, [min, debouncedMinPriceChange]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.accordion}>
        <AccordionItem open title={t("brand")}>
          <div className={classes.items}>
            {brands.map((brand) => {
              return (
                <div
                  key={brand.id}
                  className={[
                    classes.item,
                    brandIds.includes(brand.id) ? classes.active : "",
                  ].join(" ")}
                  onClick={() => onSelectBrand(brand.id)}
                >
                  {brand.title}
                </div>
              );
            })}
          </div>
        </AccordionItem>
        <AccordionItem open title={t("price")}>
          <div style={{ paddingTop: 15 }}>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[+min, +max]}
              value={[+min, +max]}
              min={0}
              max={2000000}
              onChange={(arr) => {
                setMin(arr[0]);
                setMax(arr[1]);
              }}
              pearling
              minDistance={20000}
            />
            <div className={classes.fields}>
              <div className={classes.field}>
                <label>{t("min")}</label>
                <input
                  type="number"
                  aria-label="Min price"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className={classes.field}>
                <label>{t("max")}</label>
                <input
                  type="number"
                  aria-label="Max price"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>
          </div>
        </AccordionItem>
        {filters &&
          filters.map((filter) => {
            return (
              <AccordionItem key={filter.title} title={filter.title}>
                <div className={classes.items}>
                  {filter.description.map((desc) => {
                    return (
                      <div
                        key={desc}
                        className={[
                          classes.item,
                          activeFilters[filter.title]?.includes(desc)
                            ? classes.active
                            : "",
                        ].join(" ")}
                        onClick={() => onSelectFilter(filter.title, desc)}
                      >
                        {desc}
                      </div>
                    );
                  })}
                </div>
              </AccordionItem>
            );
          })}
      </div>
      <AccordionItem title={t("clearAll")} remove />
    </div>
  );
});

export default Sidebar;
