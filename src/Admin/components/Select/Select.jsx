import classes from '../../styles/form.module.scss';

const Select = ({ state, setState, id, items, event, title }) => {
  return (
    <div className={classes.field}>
      <label>{title}</label>
      <div
        className={[classes.select, state ? classes.active : undefined].join(' ')}
        onClick={() => setState((state) => !state)}>
        {items.find((item) => item.id === id)?.title ||
          items.find((item) => item.id === id)?.title_en}
      </div>
      {state && (
        <div className={classes.options}>
          {items.map((item) => {
            if (item.id === id) return undefined;
            return (
              <div className={classes.select} key={item.id} onClick={() => event(item.id)}>
                {item.title || item.title_en}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
