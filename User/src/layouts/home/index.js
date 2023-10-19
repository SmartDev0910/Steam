import React from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import HeroSplit from "./components/sections/HeroSplit";
import Rules from "./components/sections/Rules";
import ChangeLogs from "./components/sections/ChangeLogs";
import StarterGuide from "./components/sections/StarterGuide";

const Home = () => {
  return (
    <React.Fragment>
      <Header className="invert-color" navPosition="right" />
      <main className="site-content">
        <React.Fragment>
          <HeroSplit hasBgColor invertColor />
          <Rules className="illustration-section-01" />
          <StarterGuide hasBgColor pricingSlider />
          <ChangeLogs className="illustration-section-02" />
        </React.Fragment>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
