import React from "react";
import Header from "../Components/Header.jsx";
import TypingBox from "../Components/TypingBox.jsx";
import Footer from "../Components/Footer.jsx";

const HomePage = () => {
  return (
    <div className="canvas">
      <Header />
      <TypingBox />
      <Footer />
    </div>
  );
};

export default HomePage;
