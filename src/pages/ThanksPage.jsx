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
        <Thanks title={'confirmed'} subtitle={'thanks'} btn={'continue'} img={successImg} />
      ) : (
        <Thanks title={'failed'} subtitle={'rejectedOrder'} btn={'tryAgain'} img={warnImg} />
      )}
    </>
  );
};

export default ThanksPage;
