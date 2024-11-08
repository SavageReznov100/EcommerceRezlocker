import React from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between w-full h-20 items-center px-10 bg-coastal ">
        <div>
          <p>Logo</p>
        </div>
        <div className="flex items-center justify-center gap-7">
          <FaUser className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
