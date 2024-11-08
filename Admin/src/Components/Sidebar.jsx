import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BiChevronLeft } from "react-icons/bi";
import { GiWatch } from "react-icons/gi";
import { FaList, FaBorderAll } from "react-icons/fa";

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <div className="sticky top-0 left-0">
        <div
          className={`${
            toggle ? "w-16" : "w-44"
          }  bg-coastal h-full  pr-4 pt-4 transition-all duration-500 border-black border-solid relative`}
        >
          <div className=" hidden lg:block">
            <div
              className=" absolute top-7 flex justify-center items-center -right-5 w-10 h-10 rounded-full bg-latergator cursor-pointer"
              onClick={() => setToggle(!toggle)}
            >
              <BiChevronLeft
                className={`${
                  toggle ? "rotate-180" : ""
                }  text-3xl transition-all duration-300`}
              />
            </div>
          </div>

          <div className="inline-flex w-60 ">
            <GiWatch className="text-4xl cursor-pointer  block float-none mr-2 " />
          </div>
          <div>
            <div className="flex flex-col pt-10 gap-y-4">
              <Link
                to="/"
                className={` ${
                  toggle ? "w-14  " : "w-36 pl-2"
                } flex h-14 items-center justify-center  gap-x-4 cursor-pointer mt-2  hover:bg-latergator rounded-r-full `}
              >
                <IoMdAdd className="text-base block float-left" />
                <p
                  className={`text-base font-medium flex-1 transition-all  duration-300  ${
                    toggle && "hidden"
                  }`}
                >
                  Add Product
                </p>
              </Link>

              <Link
                to="/list"
                className={` ${
                  toggle ? "w-14  " : "w-36 pl-2"
                } flex h-14 items-center justify-center  gap-x-4 cursor-pointer mt-2 hover:bg-latergator  rounded-r-full `}
              >
                <FaList className="text-base block float-left" />
                <p
                  className={`text-base font-medium flex-1 transition-all  duration-300   ${
                    toggle && "hidden"
                  }`}
                >
                  List Product
                </p>
              </Link>
              <Link
                to="/order"
                className={` ${
                  toggle ? "w-14" : "w-36 pl-2"
                } flex h-14 items-center justify-center  gap-x-4 cursor-pointer mt-2 hover:bg-latergator  rounded-r-full `}
              >
                <FaBorderAll className="text-base block float-left" />
                <p
                  className={`text-base font-medium flex-1 transition-all   duration-300   ${
                    toggle && "hidden"
                  }`}
                >
                  Orders
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
