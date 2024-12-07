import { React, useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, spring } from "framer-motion";
import ProfileNav from "./ProfileNav";
import { ProductContext } from "../Context/ProductContext";
import MobileMenu from "./MobileMenu";

const Navbar = ({ activeTab, setActiveTab }) => {
  const { getTotalCartAmount } = useContext(ProductContext);

  const mobile = [
    { id: 1, name: "Sign in", link: "/" },
    { id: 2, name: "Home", link: "/" },
    { id: 3, name: "New Collection", link: "/newcollection" },
    { id: 4, name: "Product", link: "/product" },
  ];
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      {isMenuOpen && <MobileMenu toggleMenu={toggleMenu} />}

      <div className=" bg-moonmist">
        <div className="container ">
          <div className="flex relative justify-between items-center w-full h-20 ">
            <div>
              <p className="">LOGO</p>
            </div>

            <div className="md:flex gap-x-5 hidden  ">
              {navbar.map((navbar) => (
                <NavLink key={navbar.id} to={navbar.link}>
                  <button
                    onClick={() => setActiveTab(navbar.id)}
                    className={`${activeTab === navbar.id ? "text-white " : "hover:text-blueribbon"} relative rounded-full px-3 py-1.5   `}
                  >
                    {activeTab === navbar.id && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0  bg-blueribbon"
                        transition={{ type: spring, duration: 0.5 }}
                        style={{ borderRadius: 9999 }}
                      />
                    )}
                    <p className="relative z-10">{navbar.name}</p>
                  </button>
                </NavLink>
              ))}
            </div>

            <div className="flex gap-x-5  text-base ">
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <FaRegUser className="hidden md:block hover:text-blueribbon" />
                {isProfileOpen && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 15 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ x: "-50%" }}
                      className="absolute top-3 z-20 left-1/2 "
                    >
                      <div className=" absolute -top-3 left-0 right-0 h-3 bg-transparent" />
                      <ProfileNav />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              <div className="relative">
                <Link to="/cart">
                  <FiShoppingCart className=" hover:text-blueribbon" />
                  {getTotalCartAmount() > 0 && (
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-blueribbon -right-1/3 -top-2" />
                  )}
                </Link>
              </div>

              <RxHamburgerMenu
                className="block md:hidden hover:text-blueribbon"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
