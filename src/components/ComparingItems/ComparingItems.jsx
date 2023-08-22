import React, { useEffect, useState } from 'react';
import classes from './comparingItems.module.scss';
import { removeDeviceComparing } from '../../redux/slices/compareSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ComparingItems = ({ devices, title, isFilterMode }) => {
  const dispatch = useDispatch();
  const [titles, setTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const { brands } = useSelector((state) => state.brands);

  useEffect(() => {
    let arr = [];
    if (devices && devices.length) {
      devices.forEach((device) => [
        device.info.forEach((i) => {
          arr.push(i.title);
        }),
      ]);
      let filteredTitles = [...new Set(arr)];
      setTitles(filteredTitles);
    }
  }, [devices]);

  useEffect(() => {
    filterDevices(isFilterMode && devices.length !== 1);
  }, [titles, devices, isFilterMode]);

  const filterDevices = (filterMode) => {
    let obj = {};
    if (titles.length && devices?.length) {
      for (let title of titles) {
        obj[title] = [];
      }

      for (let title of titles) {
        devices.forEach((device) => {
          if (device.info.find((i) => i.title === title)) {
            obj[title] = [...obj[title], device.info.find((i) => i.title === title).description];
          } else {
            obj[title] = [...obj[title], undefined];
          }
        });
      }
      let filteredTitles = [...titles];
      if (filterMode) {
        for (let title of titles) {
          if (
            obj[title].every(
              (item) => item === obj[title][0] && obj[title].length === devices.length,
            )
          ) {
            filteredTitles = filteredTitles.filter((t) => t !== title);
          }
        }
        Object.entries(obj).forEach(([key, value]) => {
          if (!filteredTitles.includes(key)) {
            delete obj[key];
          }
        });
      }
      setFilteredTitles(Object.entries(obj));
    }
  };

  return (
    <>
      <div className="container">
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.scroll}>
        <table className={classes.items}>
          <thead>
            <tr>
              <td className={classes.model}>
                <p>Model amount</p>
              </td>
              {devices &&
                devices.map((device) => {
                  return (
                    <td key={device.id}>
                      <div className={classes.header}>
                        <div
                          className={classes.remove}
                          onClick={() => dispatch(removeDeviceComparing(device.id))}>
                          <FontAwesomeIcon icon={faClose} />
                        </div>
                        <div className={classes.categorie}>
                          {brands.find((brand) => brand.id === device.brandId) &&
                            brands.find((brand) => brand.id === device.brandId).title}
                        </div>
                        <img
                          src={'http://localhost:8080/' + device?.images[0]}
                          alt="Comparing Item"
                        />
                        <div className={classes.name}>{device.title}</div>
                      </div>
                    </td>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {filteredTitles.map((a, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div>{a[0]}</div>
                  </td>
                  {a[1].map((item, i) => {
                    return item ? (
                      <td key={i}>
                        <div>{item}</div>
                      </td>
                    ) : (
                      <td key={Math.random()}>
                        <div>------------</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div>
        <ul className={classes.headers}>
          <li className={classes.header}>
            <p>Model amount</p>
          </li>
          {devices &&
            devices.map((device) => {
              return (
                <li className={classes.header}>
                  <div
                    className={classes.remove}
                    onClick={() => dispatch(removeDeviceComparing(device.id))}>
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                  <div className={classes.categorie}>Apple</div>
                  <img src={'http://localhost:8080/' + device?.images[0]} alt="Comparing Item" />
                  <div className={classes.name}>{device.title}</div>
                </li>
              );
            })}
        </ul>
      </div> */}
      {/* <div className={classes.items}>
        <ul className={classes.item}>
          <li className={classes.header}>
            <p>Model amount</p>
          </li>
          {filteredTitles &&
            filteredTitles.map((t) => {
              return <li key={t}>{t}</li>;
            })}
        </ul>
        {filteredTitles &&
          devices &&
          devices.map((device) => {
            return (
              <ul className={classes.item} key={device.id}>
                <li className={classes.header}>
                  <div
                    className={classes.remove}
                    onClick={() => dispatch(removeDeviceComparing(device.id))}>
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                  <div className={classes.categorie}>Apple</div>
                  <img src={'http://localhost:8080/' + device?.images[0]} alt="Comparing Item" />
                  <div className={classes.name}>{device.title}</div>
                </li>
                {device.info &&
                  device.info.map((i, index) => {
                    let currentInfo = device.info.find(
                      (information) => information.title === i.title,
                    );
                    return currentInfo ? (
                      <li key={currentInfo.id}>{currentInfo.description}</li>
                    ) : (
                      <li key={Math.random()}>------------</li>
                    );
                  })}
                
              </ul>
            );
          })}
      </div> */}
    </>
  );
};

export default ComparingItems;
