import React, { useEffect, useState } from 'react';
import SimpleDevice from '../components/SimpleDevice/SimpleDevice';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../redux/slices/brandSlice';

const SimpleDevicePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [device, setDevice] = useState();
  const [relateds, setRelateds] = useState();

  useEffect(() => {
    let localDevice;
    axios.get('/device/' + id).then(({ data }) => {
      setDevice(data);
      localDevice = data;
      axios
        .get('/devices', { params: { categorieId: localDevice.categorieId, limit: 8 } })
        .then(({ data }) => {
          data = data.filter((item) => item.id !== localDevice.id);
          setRelateds(data);
        });
    });
    dispatch(fetchBrands());
  }, [id]);
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
