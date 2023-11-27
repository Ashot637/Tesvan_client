import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Compare from '../components/Compare/Compare';
import { Helmet } from 'react-helmet';

const ComparePage = () => {
  return (
    <>
      <Helmet>
        <title>Compare | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <Compare />
    </>
  );
};

export default ComparePage;
