import classes from './sortBy.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../redux/slices/devicesSlice';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../../hooks';

const SortBy = () => {
  const dispatch = useDispatch();
  const { sortType, sortList } = useSelector((state) => state.devices);
  const [ref, isShow, setIsShow] = useClickOutside();
  const { t } = useTranslation();

  return (
    <div className={classes.sort}>
      <span>{t('sortBy')}</span>
      <div ref={ref} className={classes.select}>
        <div className={classes.option} onClick={() => setIsShow((isShow) => !isShow)}>
          <p>{t(sortType.label)}</p>
          <FontAwesomeIcon
            icon={faAngleDown}
            style={isShow ? { transform: 'rotateX(180deg)' } : undefined}
          />
        </div>
        {isShow && (
          <div className={classes.options}>
            {sortList.map((sort) => {
              if (sort.label === sortType.label) return undefined;
              return (
                <div
                  key={sort.label}
                  className={classes.option}
                  onClick={() => {
                    dispatch(setSortType(sort));
                    setIsShow((isShow) => !isShow);
                  }}>
                  <p>{t(sort.label)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;
