import ItemsSection from '../ItemsSection/ItemsSection';
import axios from '../../helpers/axios';
import useSWR from 'swr';

const fetcher = ([url, params]) =>
  axios
    .get(url, { params })
    .then(({ data }) => data)
    .catch((e) => console.log(e));

const TypedItems = ({ title, typeId, link, limit }) => {
  const { data: items } = useSWR(['/devices', { typeId, limit }], fetcher);

  return <ItemsSection title={title} items={items} link={link} />;
};

export default TypedItems;
