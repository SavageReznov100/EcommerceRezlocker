import { React, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, products, removeFromCart, addToCart, getTotalCartAmount } =
    useContext(ProductContext);
  return (
    <>
      <div className="md:container">
        <h1 className="my-10 text-5xl ">CART</h1>

        <div className="w-full bg-explosivegrey grid grid-cols-1 md:grid-cols-3">
          <div className="w-full bg-gray-500 col-span-2">
            {products.map((product) => {
              if (cartItems[product._id] > 0) {
                return (
                  <>
                    <div
                      key={product._id}
                      className=" relative flex py-6 ml-10"
                    >
                      <div className="w-[120px] h-[120px] rounded-xl overflow-hidden bg-lightgrey relative">
                        <img
                          src={product.imageFile}
                          alt="productImg"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-between px-5">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex gap-3 md:gap-20">
                            <p>{product.name}</p>
                            <p>$ {product.price * cartItems[product._id]}</p>
                          </div>

                          <p>{product.category}</p>
                        </div>
                        <div className="bg-white rounded-full flex items-center justify-between gap-2 h-8 w-24">
                          <FaMinus
                            onClick={() => removeFromCart(product._id)}
                            className="rounded-full bg-white h-4 w-4 p-1 ml-1 cursor-pointer"
                          />
                          <p>{cartItems[product._id]}</p>
                          <FaPlus
                            onClick={() => addToCart(product._id)}
                            className="rounded-full bg-latergator h-4 w-4 p-1 mr-1 cursor-pointer"
                          />
                        </div>
                      </div>
                      {/* <div
                        className="absolute top-6 text-xl right-10"
                        onClick={() => removeFromCart(product._id)}
                      >
                        <IoClose />
                      </div> */}
                    </div>
                    <hr class="border-black border "></hr>
                  </>
                );
              }
            })}
            <p className="py-6 ml-10">
              Does your cart feel empty ?
              <Link to="/product">
                <span> Shop More</span>
              </Link>
            </p>
          </div>
          <div className="py-5 px-10 h-60 ">
            <h1 className="text-2xl">Summary</h1>
            <div className="flex flex-col pt-4 gap-y-1 ">
              <div className="flex justify-between">
                <p>Subtotal :</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee :</p>
                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
            </div>

            <div className="flex justify-between pt-5">
              <p>Total :</p>
              <p>
                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
            <div className="flex justify-center mt-5">
              <Link to="/order">
                <button className="py-2 px-8 rounded-full text-white bg-latergator transition-all duration-700">
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
