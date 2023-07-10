import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import OrderForm from '../components/OrderForm/OrderForm';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';

const OrderPage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState();

  useEffect(() => {
    if (id) {
      axios.get('/device/' + id).then(({ data }) => setDevice([{ ...data, count: 1 }]));
    }
  }, [id]);

  return (
    <>
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
