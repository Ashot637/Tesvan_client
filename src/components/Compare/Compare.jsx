import React, { useEffect, useState } from 'react';
import classes from './compare.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { removeAllComparing, removeDeviceComparing } from '../../redux/slices/compareSlice';

const Compare = () => {
  const dispatch = useDispatch();
  const { devices } = useSelector((state) => state.compare);
  const [titles, setTitles] = useState([
    'Color',
    'Memory',
    'RAM',
    'Announcement Year',
    'Screen size',
    'CPU',
  ]);

  // useEffect(() => {
  //   let arr = [];
  //   if (devices.length) {
  //     devices[0].info.forEach((i) => {
  //       arr.push(i.title);
  //     });
  //     setTitles(arr);
  //   }
  //   console.log(arr);
  // }, [devices]);

  return (
    <div className={classes.compare}>
      <div className={classes.top}>
        <h2>Compare items</h2>
        <p onClick={() => dispatch(removeAllComparing())}>Delete all</p>
      </div>
      {!devices.length ? (
        <h3>Empty Comparing Items</h3>
      ) : (
        <div className={classes.items}>
          <ul className={classes.item}>
            <li className={classes.header}>
              <p>Model amount</p>
            </li>
            {titles.map((title) => {
              return <li key={title}>{title}</li>;
            })}
          </ul>
          {devices.map((device) => {
            return (
              <ul className={classes.item} key={device.id}>
                <li className={classes.header}>
                  <div
                    className={classes.remove}
                    onClick={() => dispatch(removeDeviceComparing(device.id))}>
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                  <div className={classes.categorie}>Apple</div>
                  <img src={'http://localhost:8080/' + device.img} alt="Comparing Item" />
                  <div className={classes.name}>{device.title}</div>
                </li>
                {device.info &&
                  device.info.map((i, index) => {
                    let currentInfo = device.info.find(
                      (information) => information.title === titles[index],
                    );
                    return currentInfo ? (
                      <li key={currentInfo.id}>{currentInfo.description}</li>
                    ) : undefined;
                  })}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Compare;
