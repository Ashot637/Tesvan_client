import React, { useEffect, useState } from 'react';
import Title from '../ui/Title/Title';
import ItemsSection from '../components/ItemsSection/ItemsSection';
import axios from '../helpers/axios';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const ItemsMainPage = ({ typeId, title }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('/devices', { params: { typeId, limit: 80 } }).then(({ data }) => {
      setItems(data);
      let arr = data.map((device) => device.categorie.title);
      setCategories([...new Set(arr)]);
    });
  }, [typeId]);

  return (
    <>
      <Helmet>
        <title>{title[0].toUpperCase() + title.slice(1)} | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <Title title={t(title)} />
      {categories?.map((categorie) => {
        return (
          <React.Fragment key={categorie}>
            <ItemsSection
              items={items.filter((item) => item.categorie.title === categorie)}
              title={categorie}
              main
            />
            <div style={{ marginBottom: 20, height: 5 }}></div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ItemsMainPage;
