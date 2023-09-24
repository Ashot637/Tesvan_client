import React, { useEffect, useState } from "react";
import SimpleDevice from "../components/SimpleDevice/SimpleDevice";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import axios from "../helpers/axios";
import Page404 from "./404";
import Spinner from "../components/Spinner/Spinner";
import RelatedItems from "../components/RelatedItems/RelatedItems";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const SimpleDevicePage = () => {
  const { id, categorie } = useParams();
  const [device, setDevice] = useState();
  const { devicesIds: comparingDevices } = useSelector(
    (state) => state.compare
  );
  const { devices: cartDevices } = useSelector((state) => state.cart);
  const [relateds, setRelateds] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let localDevice;
    axios
      .get("/device/" + id)
      .then(({ data }) => {
        setDevice(data);
        localDevice = data;
        axios
          .get("/devices", {
            params: { categorieId: localDevice.categorieId, limit: 9 },
          })
          .then(({ data }) => {
            data = data.filter((item) => item.id !== localDevice.id);
            data = data.splice(0, 8);
            setRelateds(data);
          });
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);

  useEffect(() => {
    if (
      categorie &&
      device &&
      categorie !== device.categorie.title_en.toLowerCase()
    ) {
      setIsError(true);
    }
  }, [categorie, device]);

  if (isError) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>{device?.title || ""} | Tesvan Electronics</title>
      </Helmet>
      {device ? (
        <>
          <Breadcrumbs
            deviceTitle={device.title}
            categorieTitle={device.categorie.title_en}
          />
          <SimpleDevice
            device={device}
            relateds={relateds}
            inCompareList={comparingDevices.includes(device.id)}
            inCart={
              !!cartDevices.find((cartDevice) => cartDevice.id === device.id)
            }
          />
          <RelatedItems relateds={relateds} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SimpleDevicePage;
