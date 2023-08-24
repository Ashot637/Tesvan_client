import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import OrderForm from '../components/OrderForm/OrderForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import { useSelector } from 'react-redux';

const OrderPage = () => {
  const { id, categorie } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [device, setDevice] = useState();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (id) {
      let quantity = new URLSearchParams(location.search).get('quantity');
      quantity = quantity || 1;
      axios
        .get('/device/' + id)
        .then(({ data }) =>
          setDevice([{ ...data, count: data.quantity < quantity ? data.quantity : quantity }]),
        )
        .catch(() => navigate('/'));
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
      navigate('/');
    }
  }, [categorie, categories, device]);

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
