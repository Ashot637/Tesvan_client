import React, { useState, useEffect } from 'react';
import ItemsSection from '../ItemsSection/ItemsSection';
import axios from '../../helpers/axios';
const TypedItems = ({ title, typeId, link, limit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('/devices', { params: { typeId, limit } })
      .then(({ data }) => setItems(data))
      .catch((e) => console.log(e));
  }, []);

  if (!items.length) {
    return <ItemsSection title={'Loading...'} loading />;
  }

  return <ItemsSection title={title} items={items} link={link} />;
};

export default TypedItems;
