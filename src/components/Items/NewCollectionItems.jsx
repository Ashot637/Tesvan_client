import React, { useEffect, useState } from 'react';
import ItemsSection from '../ItemsSection/ItemsSection';
import axios from '../../helpers/axios';
const NewCollectionItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('/devices', { params: { typeId: 2, limit: 8 } })
      .then(({ data }) => setItems(data))
      .catch((e) => console.log(e));
  }, []);

  return <ItemsSection title={'New Collection'} items={items} link={'new-collection'} />;
};

export default NewCollectionItems;
