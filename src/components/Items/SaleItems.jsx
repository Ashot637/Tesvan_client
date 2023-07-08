import React, { useState, useEffect } from 'react';
import ItemsSection from '../ItemsSection/ItemsSection';
import axios from '../../helpers/axios';
const SaleItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('/devices', { params: { typeId: 1, limit: 8 } })
      .then(({ data }) => setItems(data))
      .catch((e) => console.log(e));
  }, []);

  if (!items.length) {
    return <ItemsSection title={'Loading...'} loading />;
  }

  return <ItemsSection title={'Sale'} items={items} link={'sale'} />;
};

export default SaleItems;
