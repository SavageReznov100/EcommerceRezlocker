import React from "react";
import { Link } from "react-router-dom";

const HomepageHero = ({ activeTab, setActiveTab }) => {
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <>
      <div className="bg-[#DADDD0]">
        <div className="relative md:container  ">
          <img
            src="/img/HomeWatch.jpg"
            className="w-full h-full min-h-[600px] md:rounded-3xl object-cover"
          />
          <div className="absolute inset-y-1/4 left-4 md:left-14 text-white  font-medium tracking-wide">
            <h1 className="text-4xl md:text-6xl pb-9">
              Timeless Elegance, Redefined
            </h1>
            <h3 className="text-xl md:text-3xl pb-20">
              Find your perfect timepiece with unmatched elegance and precision
            </h3>
            <Link to="/product">
              <button
                onClick={() => setActiveTab(navbar[2].id)}
                className="py-4 px-10 bg-white text-black  hover:bg-blueribbon rounded-l-full font-semibold rounded-r-full text-xs md:text-base transition-all duration-500"
              >
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageHero;
