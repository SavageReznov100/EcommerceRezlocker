import { React, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../Context/ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { cartItems, products, token, getTotalCartAmount } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const placeOrder = async (data) => {
    const { name, email, number, address, zipcode, city, country } = data;

    let orderItems = [];
    products.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      name: name,
      email: email,
      number: number,
      address: { street: address, zipcode, city, country },
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(
      "http://localhost:4000/api/placeorder",
      orderData,
      { headers: { token } }
    );
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/signup");
  //   } else if (getTotalCartAmount() === 0) {
  //     navigate("/cart");
  //   }
  // });
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(placeOrder)}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-2">
              <div className="py-5 px-3">
                <h1 className="text-2xl">Personal Information</h1>
                <hr className="border border-black" />
                <div className="flex flex-col gap-3 my-4 ">
                  <div>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Name"
                      className={`${errors.name ? "ring-red-600" : "ring-slate-900/10 "} ring-1 w-full md:w-96 py-2 px-3 bg-white outline-none rounded-full`}
                    ></input>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-y-2 ">
                    <input
                      type="text"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      placeholder="Email"
                      className={` ${errors.email ? "ring-red-600" : "ring-slate-900/10"}  ring-1 w-72 py-2 px-3 bg-white  outline-none rounded-full`}
                    ></input>
                    {errors.email && (
                      <p className="text-red-600">Email is required</p>
                    )}

                    <input
                      type="tel"
                      {...register("number", {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                      placeholder="Phone Number"
                      className={` ${errors.number ? "ring-red-600" : "ring-slate-900/10"} ring-1 w-72  py-2 px-3 bg-white  outline-none rounded-full `}
                    ></input>
                    {errors.number && (
                      <p className="text-red-600">
                        Real Phone Number is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-5 px-3">
                <h1 className="text-2xl">Shipping Address</h1>
                <hr className="border border-black" />
                <div className="flex flex-col gap-3 my-6 ">
                  <div className="flex flex-col md:flex-row justify-between gap-y-2">
                    <input
                      type="text"
                      {...register("address", {
                        required: true,
                      })}
                      placeholder="Address"
                      className={`${errors.address ? "ring-red-600" : " ring-slate-900/10"} ring-1  w-full md:w-96 py-2 px-3 bg-white outline-none rounded-full`}
                    ></input>
                    <input
                      type="text"
                      {...register("zipcode", {
                        required: true,
                      })}
                      placeholder="Zip Code"
                      className={` ${errors.zipcode ? "ring-red-600" : "ring-slate-900/10"} ring-1 w-72  py-2 px-3 bg-white outline-none rounded-full `}
                    ></input>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-y-2 ">
                    <input
                      type="text"
                      {...register("city", {
                        required: true,
                      })}
                      placeholder="City"
                      className={` ${errors.city ? "ring-red-600" : "ring-slate-900/10"} ring-1 w-72  py-2 px-3 bg-white  outline-none rounded-full`}
                    ></input>
                    <input
                      type="text"
                      {...register("country", {
                        required: true,
                      })}
                      placeholder="Country"
                      className={`${errors.country ? "ring-red-600" : "ring-slate-900/10"} ring-1 w-72  py-2 px-3 bg-white  outline-none rounded-full `}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="py-5 px-3">
                <h1 className="text-2xl">Item</h1>
                <hr className="border border-black" />
                {products.map((product, i) => {
                  if (cartItems[product._id] > 0) {
                    return (
                      <>
                        <div
                          key={i}
                          className="flex relative flex-row justify-between py-2"
                        >
                          <p className="py-1 px-1 rounded-full bg-latergator text-white w-6 h-6 flex items-center justify-center ">
                            {cartItems[product._id]}
                          </p>
                          <p>{product.name}</p>
                          <p>$ {product.price * cartItems[product._id]}</p>
                        </div>
                      </>
                    );
                  }
                })}
                <hr className="border border-black" />
                <div className="flex flex-col gap-3 py-3">
                  <div className="flex flex-row justify-between ">
                    <p>SubTotal </p>
                    <p>$ {getTotalCartAmount()}</p>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <p>Discount </p>
                    <p>$ {0}</p>
                  </div>
                  <div className="flex flex-row justify-between ">
                    <p>Shipping Fee </p>
                    <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                  </div>
                </div>
                <hr className="border border-black" />
                <div className="flex flex-row justify-between text-2xl ">
                  <p>Total </p>
                  <p>
                    ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </p>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="py-2 px-8 w-72 rounded-full text-white bg-latergator transition-all duration-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Order;
