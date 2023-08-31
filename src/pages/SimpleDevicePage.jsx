import React, { useEffect, useState } from 'react';
import SimpleDevice from '../components/SimpleDevice/SimpleDevice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../redux/slices/brandSlice';
import Page404 from './404';
import Spinner from '../components/Spinner/Spinner';
import RelatedItems from '../components/RelatedItems/RelatedItems';
import { Helmet } from 'react-helmet';

const SimpleDevicePage = () => {
  const { id, categorie } = useParams();
  const dispatch = useDispatch();
  const [device, setDevice] = useState();
  const [relateds, setRelateds] = useState();
  const { categories } = useSelector((state) => state.categories);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let localDevice;
    axios
      .get('/device/' + id)
      .then(({ data }) => {
        setDevice(data);
        localDevice = data;
        axios
          .get('/devices', { params: { categorieId: localDevice.categorieId, limit: 9 } })
          .then(({ data }) => {
            data = data.filter((item) => item.id !== localDevice.id);
            data = data.splice(0, 8);
            setRelateds(data);
          });
      })
      .catch(() => {
        setIsError(true);
      });
    dispatch(fetchBrands(0));
  }, [id]);

  useEffect(() => {
    if (
      categories.length &&
      categorie &&
      device &&
      !categories.find(
        (c) => +c.id === +device.categorieId && c.title_en.toLowerCase() === categorie,
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
        <title>{device?.title || ''} | Tesvan Electronics</title>
      </Helmet>
      {device ? (
        <>
          <Breadcrumbs deviceTitle={device.title} />
          <SimpleDevice device={device} relateds={relateds} />
          <RelatedItems relateds={relateds} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SimpleDevicePage;
