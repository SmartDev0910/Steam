import React from "react";
import Header from "layouts/components/layouts/Header";
import Footer from "layouts/components/layouts/Footer";
import ChangeLogsSection from "layouts/components/sections/ChangeLogs";

const ChangeLogs = () => {
  return (
    <React.Fragment>
      <Header className="invert-color" navPosition="right" />
      <main className="site-content">
        <React.Fragment>
          <ChangeLogsSection hasBgColor />
        </React.Fragment>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ChangeLogs;
