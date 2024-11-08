import { React, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

import Tabs from "../Components/Tabs";

const ProductDetails = () => {
  const transition = { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.9] };

  const { name } = useParams();
  const { products, cartItems, addToCart, removeFromCart } =
    useContext(ProductContext);
  if (!Array.isArray(products)) {
    console.log("Products is not an array");
  }
  const details = products.find((item) => {
    return item.name === name;
  });
  const {
    _id,
    brand,
    category,
    price,
    imageFile,
    description,
    color,
    features,
    inStock,
    newCollection,
  } = details;

  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <motion.div
            initial={{ opacity: 0, height: "0px", width: "0px" }}
            animate={{ opacity: 1, height: "100%", width: "100%" }}
            transition={transition}
            className="col-span-2 flex justify-center "
          >
            <div className="max-w-[535px] max-h-[535px] aspect-square">
              <img
                src={imageFile}
                className="w-full h-full object-cover origin-center"
              />
            </div>
          </motion.div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-2xl">{brand}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-4xl ">{name}</p>
              <p className="text-2xl">${price}</p>
              <p>incl. local Tax & Shipping.</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className=" line-clamp-3">{description}</p>
              <p>Color : {color}</p>
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
                      className="py-2 px-16 bg-black rounded-full text-white hover:bg-latergator transition-all duration-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-full flex items-center  gap-2 h-10">
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
        <div className="my-4">
          <Tabs features={features} description={description} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
