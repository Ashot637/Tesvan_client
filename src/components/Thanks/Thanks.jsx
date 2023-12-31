import classes from './thanks.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Thanks = ({ img, title, subtitle, btn }) => {
  const { t } = useTranslation();

  return (
    <div className={classes.thanks}>
      <div className="container">
        <div className={classes.block}>
          <img width={130} height={130} src={img} alt={title} />
          <div className={classes.title}>{t(title)}</div>
          <div className={classes.subtitle}>{t(subtitle)}</div>
          <Link to="/">
            <button className={classes.btn}>{t(btn)}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
