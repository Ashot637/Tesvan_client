import React from 'react';
import Thanks from '../components/Thanks/Thanks';
import successImg from '../img/success.png';
import warnImg from '../img/warn.png';
import letter from '../img/letter.png';
import { Helmet } from 'react-helmet';

const ThanksPage = ({ type }) => {
  const getContent = () => {
    switch (type) {
      case 'success':
        return <Thanks title={'confirmed'} subtitle={'thanks'} btn={'continue'} img={successImg} />;
      case 'reject':
        return (
          <Thanks title={'failed'} subtitle={'rejectedOrder'} btn={'tryAgain'} img={warnImg} />
        );
      default:
        return (
          <Thanks
            title={'contactThanks'}
            subtitle={'weHaveReceived'}
            btn={'backToHomePage'}
            img={letter}
          />
        );
    }
  };
  return (
    <>
      <Helmet>
        <title>Tesvan Electronics</title>
      </Helmet>
      {getContent()}
    </>
  );
};

export default ThanksPage;
