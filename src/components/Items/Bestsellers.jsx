import React, { useEffect, useState } from 'react';
import ItemsSection from '../ItemsSection/ItemsSection';
import axios from '../../helpers/axios';

const BestsellersItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('/devices', { params: { typeId: 3, limit: 4 } })
      .then(({ data }) => setItems(data))
      .catch((e) => console.log(e));
  }, []);

  if (!items.length) {
    return <ItemsSection title={'Loading...'} loading />;
  }

  return <ItemsSection title={'Bestsellers'} items={items} link={'bestsellers'} />;
};

export default BestsellersItems;
