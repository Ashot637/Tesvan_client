import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './searchPanel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from '../../helpers/axios';
import getPrice from '../../helpers/getPrice';
import { debounce } from 'debounce';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchPanel = ({ setIsOpenSearchPanel }) => {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [devices, setDevices] = useState([]);
  const [empty, setEmpty] = useState(false);
  const searchRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    setEmpty(false);
    onSearch(term);
  }, [term]);

  useEffect(() => {
    const closePopup = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setTerm('');
        setDevices([]);
      }
    };
    if (term) {
      document.body.addEventListener('mousedown', closePopup);
    } else {
      document.body.removeEventListener('mousedown', closePopup);
    }

    return () => {
      document.body.removeEventListener('mousedown', closePopup);
    };
  }, [term]);

  const onSearch = useCallback(
    debounce((term) => {
      if (term.trim()) {
        axios.post('/devices/search', { title: term.trim() }).then(({ data }) => {
          if (data.length) {
            setDevices(data);
          } else {
            setEmpty(true);
            setDevices([]);
          }
        });
      }
      if (!term.trim()) {
        setEmpty(false);
        setDevices([]);
      }
    }, 500),
    [],
  );

  const onNavigateToSearchedItem = (device) => {
    navigate(`/categories/${device.categorie.title_en.toLowerCase()}/${device.id}`);
    setDevices([]);
    setTerm('');
    setIsOpenSearchPanel && setIsOpenSearchPanel(false);
  };

  return (
    <form className={classes.search} ref={searchRef} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={classes.searchPanel}
        placeholder={t('placeholder')}
      />
      <button type="button" aria-label="Search Product" className={classes.searchIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {devices.length > 0 && (
        <table className={classes.devices}>
          <tbody>
            {devices.map((device) => {
              return (
                <tr key={device.id} onClick={() => onNavigateToSearchedItem(device)}>
                  <td width={'5%'}>
                    <img
                      src={'http://134.209.251.128/service/' + device?.images[0]}
                      alt="Searched Device"
                    />
                  </td>
                  <td width={'50%'}>{device.title}</td>
                  <td width={'25%'} style={{ textAlign: 'right' }}>
                    {getPrice(device.price)} {t('amd')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {empty && <h2>{t('nothingFound')}</h2>}
    </form>
  );
};

export default SearchPanel;
