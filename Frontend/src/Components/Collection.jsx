import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Collection = ({ products }) => {
  const { imageFile, name } = products;
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  return (
    <>
      <div className="bg-black p-2 rounded-3xl w-[350px] h-[600px]">
        <div className="overflow-hidden rounded-3xl bg-lightgrey">
          <motion.img
            whileHover={{ scale: 1.07 }}
            transition={transition}
            src={imageFile}
            placeholder="blur"
            className="w-full h-[350px] object-cover rounded-3xl"
          />
        </div>
        <div className="text-center text-pretty text-white mt-8">
          <div className="flex flex-col gap-2 mb-8">
            <h1>Redefine Your Look</h1>
            <p>
              A sleek,mordern watch that blends bold elegance with timeless
              sophistication for any reason
            </p>
          </div>

          <button className="py-1.5 pl-4 pr-1 rounded-full bg-black border">
            <div className="flex items-center gap-5 ">
              <span>Know More</span>
              <Link to={`/product/${name}`}>
                <div className=" py-2 px-2 rounded-full bg-white hover:bg-latergator transition-all duration-700 text-black text-xl">
                  <FiArrowUpRight />
                </div>
              </Link>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Collection;
