import React, { memo } from 'react';
import classes from './card.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addDevice, toggleIsOpen } from '../../redux/slices/cartSlice';
import getPrice from '../../helpers/getPrice';
import { addDeviceComparing } from '../../redux/slices/compareSlice';
import { useTranslation } from 'react-i18next';

const Card = memo(({ item, inCompareList, inCart }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const onAddToCart = (item) => {
    if (inCart) {
      dispatch(toggleIsOpen());
    } else {
      item = {
        ...item,
        count: 1,
      };

      dispatch(addDevice(item));
    }
  };

  const onAddToCompare = (item) => {
    dispatch(addDeviceComparing(item.id));
  };

  const getItemTypeImg = (id) => {
    switch (id) {
      case 1:
        return (
          <img
            className={[classes.itemType, classes.saleImg].join(' ')}
            src={'/img/sale.png'}
            alt="Sale"
          />
        );
      case 2:
        return (
          <img
            className={[classes.itemType, classes.newCollectionImg].join(' ')}
            src={'/img/new-collection.png'}
            alt="New colection"
          />
        );
      case 3:
        return <img className={classes.itemType} src={'/img/bestseller.png'} alt="Bestseller" />;
      default:
        return;
    }
  };

  const navigateToOrderOutOfStock = () => {
    localStorage.setItem('outOfStockDeviceTitle', item.title);
    navigate('/contacts/make-order');
  };

  return (
    <div className={classes.item} data-testid="card">
      {location.pathname.includes('categories/') && !id && getItemTypeImg(item.typeId)}
      <div className={classes.top}>
        <span>{item.brand.title}</span>
        <FontAwesomeIcon
          icon={faCodeCompare}
          className={[classes.compare, inCompareList ? classes.selected : undefined].join(' ')}
          onClick={() => onAddToCompare(item)}
        />
      </div>
      <Link
        className={classes.body}
        to={`/categories/${item.categorie.title_en.toLowerCase()}/${item.id}`}>
        <div className={classes.imgHolder}>
          <img
            src={'http://localhost:8080/' + item?.images[0]}
            alt="Macbook"
            width={259}
            height={175}
          />
        </div>
        <span className={classes.name}>{item.title}</span>
        {item?.quantity === 0 ? (
          <div className={classes.out}>{t('outOfStock')}</div>
        ) : (
          <>
            <span className={classes.price}>
              {getPrice(item.price)} {t('amd')}
            </span>
            {+item.oldPrice ? (
              <span className={classes.oldPrice}>
                {getPrice(item.oldPrice)} {t('amd')}
              </span>
            ) : (
              <>
                <br />
                <br />
                <br />
              </>
            )}
          </>
        )}
      </Link>
      {item?.quantity === 0 ? (
        <button className={classes.contactUs} onClick={() => navigateToOrderOutOfStock()}>
          {t('contactUs')}
        </button>
      ) : (
        <div className={classes.btns}>
          <Link to={`/categories/${item.categorie.title_en.toLowerCase()}/${item.id}/make-order`}>
            <button>{t('buy')}</button>
          </Link>
          <button onClick={() => onAddToCart(item)}>
            {inCart ? t('addedToCart') : t('addToCart')}
          </button>
        </div>
      )}
    </div>
  );
});

export default Card;
