import React, { memo, useEffect, useMemo, useState } from 'react';
import classes from '../orderForm.module.scss';
import { useClickOutside } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../helpers/axios';
import { faAngleDown, faAngleUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Regions = memo(({ selectedRegion, setSelectedRegion }) => {
  const { t } = useTranslation();
  const [ref, isShow, setIsShow] = useClickOutside();
  const [regions, setRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchedRegions = useMemo(() => {
    if (searchTerm.trim()) {
      return regions.filter((reg) =>
        reg?.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      );
    }
  }, [searchTerm, regions]);

  useEffect(() => {
    if (!regions.length && isShow) {
      axios.get('/regions').then(({ data }) => {
        setRegions([
          {
            id: 0,
            price: 0,
          },
          ...data,
        ]);
      });
    }
  }, [isShow]);

  return (
    <div className={classes.field} ref={ref}>
      <label>{t('region')}</label>
      <div
        className={[
          classes.selectedOption,
          isShow ? classes.opened : undefined,
          selectedRegion?.id === 0 ? classes.lightGrey : undefined,
        ].join(' ')}
        onClick={() => setIsShow((isShow) => !isShow)}>
        {selectedRegion?.id === 0 ? t('select') : selectedRegion?.title}
        <FontAwesomeIcon icon={isShow ? faAngleUp : faAngleDown} />
      </div>
      {isShow && (
        <div className={classes.optionsHolder}>
          {regions.length || searchedRegions ? (
            <>
              <div className={classes.searchPanel}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.searchIcon} />
              </div>
              <div className={classes.options}>
                {[...(searchTerm.trim().length ? searchedRegions : regions)].map((reg) => {
                  if (reg.id === selectedRegion?.id || reg.id === 0) return undefined;
                  return (
                    <div
                      key={reg.id}
                      onClick={() => {
                        setSelectedRegion(reg);
                        setIsShow(false);
                      }}
                      className={classes.option}>
                      {reg.title}
                    </div>
                  );
                })}
                {!!searchTerm.trim().length && !searchedRegions && <p>{t('nothingFound')}</p>}
              </div>
            </>
          ) : (
            <span className={classes.loader}></span>
          )}
        </div>
      )}
    </div>
  );
});

export default Regions;
