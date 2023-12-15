import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import OrderForm from '../components/OrderForm/OrderForm';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import Page404 from './404';
import { Helmet } from 'react-helmet';

const OrderPage = () => {
  const { id, categorie } = useParams();
  const location = useLocation();
  const [device, setDevice] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [id, categorie]);

  useEffect(() => {
    if (id) {
      let quantity = new URLSearchParams(location.search).get('quantity');
      quantity = quantity || 1;
      axios
        .get('/device/' + id)
        .then(({ data }) => {
          if (categorie && data && categorie !== data.categorie.title_en.toLowerCase()) {
            setIsError(true);
          }
          setDevice([
            {
              ...data,
              count: data.quantity < quantity ? data.quantity : quantity,
            },
          ]);
        })
        .catch(() => setIsError(true));
    }
  }, [id, categorie]);

  if (isError) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>Make order | Tesvan Electronics</title>
      </Helmet>
      {id ? (
        device.length && (
          <>
            <Breadcrumbs deviceTitle={device[0].title} categorieTitle={device[0].categorie.title} />
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
