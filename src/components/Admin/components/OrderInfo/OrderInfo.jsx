import React, { useEffect, useState } from 'react';
import classes from './orderInfo.module.scss';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../../helpers/axios';
import Select from '../Select/Select';

const OrderInfo = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [devices, setDevices] = useState([]);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [statusId, setStatusId] = useState(0);
  const statuses = [
    {
      id: 1,
      title: 'pending',
    },
    {
      id: 2,
      title: 'processing',
    },
    {
      id: 3,
      title: 'delivered',
    },
    {
      id: 4,
      title: 'picked',
    },
  ];
  const [confirmedStatusId, setConfirmedStatusId] = useState();

  useEffect(() => {
    axios.get('/orders/' + id).then(({ data }) => {
      setOrder(data);
      let a = statuses.find((status) => data.status === status.title)?.id;
      setStatusId(a);
      setConfirmedStatusId(a);
    });
  }, [id]);

  useEffect(() => {
    if (order) {
      let parsedData = JSON.parse(order.devices);
      let ids = parsedData.map((device) => device.id);
      axios
        .post('/devices/ids', {
          ids,
        })
        .then(({ data }) => {
          setDevices(getOrderedDevices(parsedData, data));
        });
    }
  }, [order]);

  const getOrderedDevices = (ids, data) => {
    const resultMap = new Map();

    ids.forEach((item) => {
      resultMap.set(item.id, { ...item });
    });

    data.forEach((item) => {
      const existingItem = resultMap.get(item.id);
      if (existingItem) {
        resultMap.set(item.id, { ...existingItem, ...item });
      } else {
        resultMap.set(item.id, { ...item });
      }
    });

    return Array.from(resultMap.values());
  };

  const onSelectStatus = (id) => {
    setStatusId(id);
    setIsOpenStatus(false);
  };

  const convertDateTimeFormat = (date) => {
    const dt = new Date(date);

    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = String(dt.getFullYear()).slice(-2);
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const onUpdateStatus = () => {
    axios
      .patch('/orders/' + id, {
        status: statuses[statusId - 1].title,
        name: order.name,
        email: order.email,
      })
      .then(({ data }) => setConfirmedStatusId(statusId));
  };

  return (
    <>
      {order && (
        <div className={classes.orderInfo}>
          {Object.entries(order).map((arr) => {
            if (
              arr[0] === 'devices' ||
              arr[0] === 'status' ||
              arr[0] === 'updatedAt' ||
              arr[0] === 'createdAt'
            )
              return undefined;
            return (
              <div className={classes.row} key={arr[0]}>
                <span>{arr[0]}:</span>
                <p>{arr[1]}</p>
              </div>
            );
          })}
          <div className={classes.row}>
            <span>Ordered at:</span>
            <p>{convertDateTimeFormat(order.createdAt)}</p>
          </div>
          <div className={classes.devices}>
            {devices &&
              devices.map((device) => (
                <Link key={device.id} className={classes.device} to={'/admin/devices/' + device.id}>
                  <img
                    src={'http://localhost:8080/' + device.images[0]}
                    height={150}
                    alt="Device"
                  />
                  <span>{device.title}</span>
                  <span>{device.count} pcs</span>
                </Link>
              ))}
          </div>
          <div>
            <Select
              state={isOpenStatus}
              setState={setIsOpenStatus}
              id={statusId}
              items={statuses}
              event={onSelectStatus}
              title={'Status'}
            />
          </div>
          {statusId !== confirmedStatusId && (
            <div onClick={onUpdateStatus} className={classes.btn}>
              Save
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderInfo;
