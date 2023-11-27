import React, { lazy } from "react";
import { Helmet } from "react-helmet";

const Intro = lazy(() => import("../components/Intro/Intro"));
const TypedItems = lazy(() => import("../components/TypedItems/TypedItems"));
const CategoriesSlider = lazy(() =>
  import("../components/CategoriesSlider/CategoriesSlider")
);
const Slider = lazy(() => import("../components/Slider/Slider"));
const Brands = lazy(() => import("../components/Brands/Brands"));

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Tesvan Electronics</title>
      </Helmet>
      <Intro />
      <CategoriesSlider />
      <TypedItems title={"sale"} typeId={1} link={"sale"} limit={8} />
      <TypedItems
        title={"new-collection"}
        typeId={2}
        link={"new-collection"}
        limit={8}
      />
      <Slider />
      <TypedItems
        title={"bestsellers"}
        typeId={3}
        link={"bestsellers"}
        limit={4}
      />
      <Brands />
    </>
  );
};

export default HomePage;
