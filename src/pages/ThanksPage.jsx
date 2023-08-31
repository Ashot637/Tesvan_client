import React from 'react';
import Thanks from '../components/Thanks/Thanks';
import successImg from '../img/success.png';
import warnImg from '../img/warn.png';
import { Helmet } from 'react-helmet';

const ThanksPage = ({ success }) => {
  return (
    <>
      <Helmet>
        <title>Tesvan Electronics</title>
      </Helmet>
      {success ? (
        <Thanks
          title={'Order confirmed!'}
          subtitle={"Thanks for shopping with us! We'll contact you soon to arrange delivery."}
          btn={'Continue'}
          img={successImg}
        />
      ) : (
        <Thanks
          title={'Order failed!'}
          subtitle={'Please check Your payment details and try again.'}
          btn={'Try again'}
          img={warnImg}
        />
      )}
    </>
  );
};

export default ThanksPage;
