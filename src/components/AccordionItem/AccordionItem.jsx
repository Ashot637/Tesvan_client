import React, { useState } from 'react';
import classes from './accordionItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeAllFilters } from '../../redux/slices/devicesSlice';
import { useDispatch, useSelector } from 'react-redux';

const AccordionItem = ({ children, title, remove, open }) => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.devices);
  const [isOpen, setIsOpen] = useState(open || Object.keys(activeFilters)?.includes(title));

  return (
    <div className={classes.item}>
      <div
        className={[classes.top, isOpen && !remove ? classes.active : undefined].join(' ')}
        onClick={() => {
          if (!remove) {
            setIsOpen((isOpen) => !isOpen);
          } else {
            dispatch(removeAllFilters());
          }
        }}>
        <span>{title}</span>
        {!remove ? (
          <FontAwesomeIcon
            className={classes.angle}
            style={isOpen ? { transform: 'rotateX(180deg)' } : undefined}
            icon={faAngleDown}
          />
        ) : (
          <FontAwesomeIcon className={classes.angle} icon={faTrash} />
        )}
      </div>
      {!remove && isOpen && <div className={classes.body}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
