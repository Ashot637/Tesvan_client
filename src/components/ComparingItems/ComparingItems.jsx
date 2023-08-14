import React, { useEffect, useState } from 'react';
import classes from './comparingItems.module.scss';
import { removeDeviceComparing } from '../../redux/slices/compareSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ComparingItems = ({ devices, title, isFilterMode }) => {
  const dispatch = useDispatch();
  const [titles, setTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [arr, setArr] = useState([]);

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
    let obj = {};
    setArr([...titles]);
    if (isFilterMode && devices.length !== 1) {
      filterDevices(obj);
      setFilteredTitles(arr);
    } else {
      setFilteredTitles(titles);
    }
  }, [titles, devices]);

  const filterDevices = (obj) => {
    if (titles.length && devices?.length) {
      for (let title of titles) {
        obj[title] = [];
      }
      devices.forEach((device) =>
        device.info.forEach((i) => {
          let key = i.title;
          obj[key] = [...obj[key], i.description];
        }),
      );
      for (let key of Object.keys(obj)) {
        if (obj[key].every((v) => v === obj[key][0] && obj[key].length === obj['Color'].length)) {
          setArr((arr) => arr.filter((t) => t !== key));
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.items}>
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
                      (information) => information.title === filteredTitles[index],
                    );
                    return currentInfo ? (
                      <li key={currentInfo.id}>{currentInfo.description}</li>
                    ) : // <li key={Math.random()}>------------</li>
                    undefined;
                  })}
              </ul>
            );
          })}
      </div>
    </>
  );
};

export default ComparingItems;
