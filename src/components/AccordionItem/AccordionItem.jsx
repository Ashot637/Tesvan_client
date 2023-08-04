import React, { useState } from 'react';
import classes from './accordionItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const AccordionItem = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.item}>
      <div
        className={[classes.top, isOpen ? classes.active : undefined].join(' ')}
        onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <span>{title}</span>
        <FontAwesomeIcon
          className={classes.angle}
          style={isOpen ? { transform: 'rotateX(180deg)' } : undefined}
          icon={faAngleDown}
        />
      </div>
      {isOpen && <div className={classes.body}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
