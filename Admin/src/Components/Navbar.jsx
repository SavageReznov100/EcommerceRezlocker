import React from "react";
import UserIcon from "../Icons/UserIcon";

const Navbar = () => {
  return (
    <>
      <div className="flex h-20 w-full items-center justify-end bg-background px-10">
        <div className="flex items-center justify-center gap-7 text-white">
          <UserIcon />
        </div>
      </div>
    </>
  );
};

export default Navbar;
