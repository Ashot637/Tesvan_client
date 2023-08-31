import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import OrderForm from '../components/OrderForm/OrderForm';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import { useSelector } from 'react-redux';
import Page404 from './404';
import { Helmet } from 'react-helmet';

const OrderPage = () => {
  const { id, categorie } = useParams();
  const location = useLocation();
  const [device, setDevice] = useState();
  const { categories } = useSelector((state) => state.categories);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      let quantity = new URLSearchParams(location.search).get('quantity');
      quantity = quantity || 1;
      axios
        .get('/device/' + id)
        .then(({ data }) =>
          setDevice([{ ...data, count: data.quantity < quantity ? data.quantity : quantity }]),
        )
        .catch(() => setIsError(true));
    }
  }, [id, categorie]);

  useEffect(() => {
    if (
      categories.length &&
      categorie &&
      device?.length &&
      !categories.find(
        (c) => +c.id === +device[0].categorieId && c.title_en.toLowerCase() === categorie,
      )
    ) {
      setIsError(true);
    }
  }, [categorie, categories, device]);

  if (isError) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>Make order | Tesvan Electronics</title>
      </Helmet>
      {id ? (
        device && (
          <>
            <Breadcrumbs deviceTitle={device.title} />
            <OrderForm device={device} />
          </>
        )
      ) : (
        <>
          <Breadcrumbs />
          <OrderForm />
        </>
      )}
    </>
  );
};

export default OrderPage;
