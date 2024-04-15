import Thanks from "../components/Thanks/Thanks";
import { Helmet } from "react-helmet";

const ThanksPage = ({ type }) => {
  const getContent = () => {
    switch (type) {
      case "success":
        return (
          <Thanks
            title={"confirmed"}
            subtitle={"thanks"}
            btn={"continue"}
            img={"/img/success.png"}
          />
        );
      case "reject":
        return (
          <Thanks
            title={"failed"}
            subtitle={"rejectedOrder"}
            btn={"backToHomePage"}
            img={"/img/warn.png"}
          />
        );
      default:
        return (
          <Thanks
            title={"contactThanks"}
            subtitle={"weHaveReceived"}
            btn={"backToHomePage"}
            img={"/img/letter.png"}
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
