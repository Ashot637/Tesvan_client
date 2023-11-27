import { Helmet } from 'react-helmet';
import classes from '../styles/404.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Page not found | Tesvan Electronics</title>
      </Helmet>
      <div className={classes.page404}>
        <div className="container">
          <div className={classes.block}>
            <div className={classes.imgs}>
              <img src={'/img/404.png'} alt="Page not found" />
              <img src={'/img/404small.png'} alt="Page not found" />
            </div>
            <h2>{t('opps')}</h2>
            <Link to={'/'}>
              <button>{t('backToHomePage')}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
