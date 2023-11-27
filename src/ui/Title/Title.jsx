import classes from './title.module.scss';

const Title = ({ title, children }) => {
  return (
    <div className={classes.title}>
      <div className={['container', classes.inner].join(' ')}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Title;
