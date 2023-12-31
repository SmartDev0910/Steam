import React from "react";
import Header from "layouts/components/layouts/Header";
import HeroSplit from "layouts/components/sections/HeroSplit";

const Home = () => {
  return (
    <React.Fragment>
      <Header className="invert-color" navPosition="right" />
      <main className="site-content">
        <React.Fragment>
          <HeroSplit hasBgColor invertColor />
        </React.Fragment>
      </main>
    </React.Fragment>
  );
};

export default Home;
