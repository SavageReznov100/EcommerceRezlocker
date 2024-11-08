import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ProductContext } from "../Context/ProductContext";

const Shoppage = ({ updateproducts }) => {
  const [hover, setHover] = useState(false);
  const { name, price, imageFile, inStock, newCollection, _id } =
    updateproducts;
  const onHover = () => {
    setHover(!hover);
  };
  const { cartItems, addToCart, removeFromCart } = useContext(ProductContext);
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };
  return (
    <>
      <motion.div
        exit={{ opacity: 0 }}
        transition={transition}
        className=" bg-explosivegrey p-2 max-w-[380px] w-full rounded-3xl"
      >
        <div className="flex flex-row gap-2">
          <Link to={`/product/${name}`}>
            <div className="w-[200px] h-[150px] rounded-3xl overflow-hidden  bg-lightgrey relative">
              <motion.img
                whileHover={{ scale: 1.07 }}
                transition={transition}
                src={imageFile}
                className="w-full h-full object-cover rounded-3xl"
              />
              {newCollection && (
                <p className="text-white absolute top-2 left-3 flex justify-center items-center py-0.5 px-0.5 bg-black text-xs">
                  NEW
                </p>
              )}
            </div>
          </Link>

          <div className="flex flex-col justify-between ">
            <div className="flex flex-col pt-1 gap-1">
              <p>{name}</p>
              <p>${price}</p>
              {inStock ? (
                <p className="text-green-500">In Stock</p>
              ) : (
                <p className="text-red-500">Not In Stock</p>
              )}
            </div>
            {inStock && (
              <div>
                {!cartItems[_id] ? (
                  <div>
                    <button
                      onClick={() => addToCart(_id)}
                      className=" flex items-center gap-1 bg-white hover:bg-latergator rounded-full py-2 px-3 transition-all duration-700"
                      onMouseEnter={onHover}
                      onMouseLeave={onHover}
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-full flex items-center justify-between gap-2 h-10">
                    <FaMinus
                      onClick={() => removeFromCart(_id)}
                      className="rounded-full bg-white h-6 w-6 p-1 ml-1 cursor-pointer"
                    />
                    <p>{cartItems[_id]}</p>
                    <FaPlus
                      onClick={() => addToCart(_id)}
                      className="rounded-full bg-latergator h-6 w-6 p-1 mr-1 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Shoppage;
