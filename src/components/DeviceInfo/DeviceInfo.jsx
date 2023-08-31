import React, { memo, useEffect, useState } from 'react';
import classes from './deviceInfo.module.scss';
import axios from '../../helpers/axios';
import { useTranslation } from 'react-i18next';

const DeviceInfo = memo(({ info }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [deviceInfoCategories, setDeviceInfoCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('deviceInfoCategories').then(({ data }) => {
      let item = data.find((d) => d.title_en === 'Others');
      let index = data.indexOf(item);

      if (index !== -1) {
        data.splice(index, 1);
        data.push(item);
      }
      setDeviceInfoCategories(data);
    });
  }, []);

  return (
    <>
      <div
        className={classes.more}
        onClick={() => setMoreOpen((moreOpen) => !moreOpen)}
        style={moreOpen ? { filter: 'grayscale(0.5)' } : undefined}>
        {t('moreInformation')}
      </div>

      {moreOpen &&
        deviceInfoCategories.map((categorie) => {
          let infos = info.filter((i) => i.deviceInfoCategorieId === categorie.id);
          if (infos?.length) {
            return (
              <table key={categorie.title} className={classes.moreInfo}>
                <thead>
                  <tr>
                    <td>{categorie.title}</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {infos.map((i) => {
                    return (
                      <tr key={i.id}>
                        <td>{i.title}</td>
                        <td>{i.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          }
          return undefined;
        })}
    </>
  );
});

export default DeviceInfo;
