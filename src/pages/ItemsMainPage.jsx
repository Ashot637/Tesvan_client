import React, { useEffect, useState } from 'react';
import Title from '../ui/Title/Title';
import ItemsSection from '../components/ItemsSection/ItemsSection';
import axios from '../helpers/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categoriesSlice';

const ItemsMainPage = ({ typeId, title }) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    axios.get('/devices', { params: { typeId, limit: 50 } }).then(({ data }) => setItems(data));
  }, []);

  return (
    <>
      <Title title={title} />
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
                <br />
                <br />
                <br />
              </React.Fragment>
            );
          }
          return undefined;
        })}
    </>
  );
};

export default ItemsMainPage;
