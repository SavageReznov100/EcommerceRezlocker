import React from "react";
import HomepageHero from "../Components/HomepageHero";
import AddHero from "../Components/AddHero";
import NewCollection from "../Components/NewCollection";
import NewsLetter from "../Components/NewsLetter";
import ComingSoon from "../Components/ComingSoon";

const HomePage = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <HomepageHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <AddHero />
      {/* <NewCollection activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <NewsLetter />
      {/* <ComingSoon  /> */}
    </>
  );
};

export default HomePage;
