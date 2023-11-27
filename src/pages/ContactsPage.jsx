import Contacts from '../components/Contacts/Contacts';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet';

const ContactsPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact us | Tesvan Electronics</title>
      </Helmet>
      <Breadcrumbs />
      <Contacts />
    </>
  );
};

export default ContactsPage;
