import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = ({ activeTab, setActiveTab }) => {
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 container  py-8">
        <div>Logo</div>
        <div className="flex flex-row justify-evenly lg:justify-center pb-4 gap-10">
          <h1>
            <NavLink
              to="/newcollection"
              onClick={() => setActiveTab(navbar[1].id)}
            >
              New Collection
            </NavLink>
          </h1>
          <h1>
            <NavLink to="/product" onClick={() => setActiveTab(navbar[2].id)}>
              Products
            </NavLink>
          </h1>
          <h1>
            <NavLink>About Us</NavLink>
          </h1>
        </div>
        <div className="flex flex-row lg:flex-col lg:items-center justify-between lg:justify-center lg:gap-y-10">
          <div>
            <h1>Our Information</h1>
            <p>1-3 Guantamala Str</p>
            <p>Cavnero</p>
          </div>

          <div className="flex flex-row gap-5 text-2xl">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
