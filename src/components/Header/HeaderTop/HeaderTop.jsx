import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../header.module.scss';
import { faAngleDown, faPhone } from '@fortawesome/free-solid-svg-icons';

import { changeLanguage } from '../../../redux/slices/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useClickOutside } from '../../../hooks';
import { memo } from 'react';

const HeaderTop = memo(() => {
  const dispatch = useDispatch();
  const { language, languagesList } = useSelector((state) => state.language);
  const [ref, isShow, setIsShow] = useClickOutside();

  const onChangeLanguage = (lan) => {
    dispatch(changeLanguage(lan));
    window.location.reload(true);
  };

  return (
    <div className={classes.top}>
      <ul className={classes.flex}>
        <li>
          <FontAwesomeIcon icon={faPhone} />
          <a href="tel:+37491751900">
            <span>+ (374) 91 75 19 00</span>
          </a>
        </li>
        <li ref={ref} onClick={() => setIsShow((isOpen) => !isOpen)}>
          <img src={language.img} alt={`${language.label} flag`} width={20} height={10} />
          <div className={classes.select}>{language.label}</div>
          <FontAwesomeIcon
            className={classes.angle}
            style={isShow ? { transform: 'rotateX(180deg)' } : undefined}
            icon={faAngleDown}
          />
          {isShow && (
            <ul className={classes.options}>
              {languagesList.map((lan) => {
                return lan.title === language.title ? undefined : (
                  <li key={lan.title} onClick={() => onChangeLanguage(lan)}>
                    <img src={lan.img} alt={`${language.label} flag`} width={20} height={10} />
                    <p>{lan.label}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
});

export default HeaderTop;
