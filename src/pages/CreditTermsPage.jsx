import CreditTerms from '../components/CreditTerms/CreditTerms';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet';

const CreditTermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Credit terms | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <CreditTerms />
    </>
  );
};

export default CreditTermsPage;
