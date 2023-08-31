import React, { useEffect, useState } from 'react';
import Title from '../ui/Title/Title';
import ItemsSection from '../components/ItemsSection/ItemsSection';
import axios from '../helpers/axios';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const ItemsMainPage = ({ typeId, title }) => {
  const [items, setItems] = useState([]);
  const { categories, status } = useSelector((state) => state.categories);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('/devices', { params: { typeId, limit: 50 } }).then(({ data }) => setItems(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>{title[0].toUpperCase() + title.slice(1)} | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <Title title={t(title)} />
      {status === 'success' &&
        categories.map((categorie) => {
          if (items.find((item) => item.categorieId === categorie.id)) {
            return (
              <React.Fragment key={categorie.id}>
                <ItemsSection
                  items={items.filter((item) => item.categorieId === categorie.id)}
                  title={categorie.title}
                  main
                />
                <div style={{ marginBottom: 20, height: 5 }}></div>
              </React.Fragment>
            );
          }
          return undefined;
        })}
    </>
  );
};

export default ItemsMainPage;
