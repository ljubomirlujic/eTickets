import React from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

function MainLayout(props) {
  return (
    <div className="page-container">
      <Header />
      <main id="content-wrap">{props.children}</main>
      <Footer id="footer" />
    </div>
  );
}

export default MainLayout;
