import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const HomepageHero = ({ activeTab, setActiveTab }) => {
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <>
      <div className="bg-background">
        <div className="relative">
          <img
            src="/img/HomeWatch.jpg"
            className="h-full min-h-[600px] w-full object-cover"
          />
          <div className="absolute inset-y-1/4 left-4 font-medium tracking-widest text-white md:left-14">
            <h1 className="font-libre pb-9 text-4xl md:text-6xl lg:text-8xl">
              Timeless Elegance, Redefined
            </h1>
            <h3 className="font-libre pb-20 text-xl md:text-3xl lg:text-4xl">
              Find your perfect timepiece with unmatched elegance and precision
            </h3>
            <Link to="/product">
              <Button
                onClick={() => setActiveTab(navbar[2].id)}
                Text_Color={"white"}
                Font={"raleway"}
                Padding_Y={"16px"}
                Padding_X={"40px"}
                Text={"Explore"}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageHero;
