import classes from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.overlay}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default Spinner;
