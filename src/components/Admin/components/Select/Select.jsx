import React from 'react';
import classes from '../../styles/form.module.scss';

const Select = ({ state, setState, id, items, event, title }) => {
  return (
    <div className={classes.field}>
      <label>{title}</label>
      <div
        className={[classes.select, state ? classes.active : undefined].join(' ')}
        onClick={() => setState((state) => !state)}>
        {items.find((item) => item.id === id) && items.find((item) => item.id === id).title}
      </div>
      {state && (
        <div className={classes.options}>
          {items.map((item) => {
            if (item.id === id) return undefined;
            return (
              <div className={classes.select} key={item.id} onClick={() => event(item.id)}>
                {item.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
