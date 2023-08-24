import React, { useEffect, useState } from 'react';
import SimpleDevice from '../components/SimpleDevice/SimpleDevice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../redux/slices/brandSlice';

const SimpleDevicePage = () => {
  const { id, categorie } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [device, setDevice] = useState();
  const [relateds, setRelateds] = useState();
  const { categories } = useSelector((state) => state.categories);

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
        navigate('/');
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
      navigate('/');
    }
  }, [categorie, categories, device]);

  return (
    <>
      {device && (
        <>
          <Breadcrumbs deviceTitle={device.title} />
          <SimpleDevice device={device} relateds={relateds} />
        </>
      )}
    </>
  );
};

export default SimpleDevicePage;
