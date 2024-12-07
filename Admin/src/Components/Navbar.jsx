import React from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-end w-full h-20 items-center px-10 bg-background ">
        <div className="flex  text-white items-center justify-center gap-7">
          <FaUser className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
