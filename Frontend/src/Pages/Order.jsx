import { React, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../Context/ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonGreen from "../Components/Button/ButtonGreen";

const Order = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { cartItems, products, token, getTotalCartAmount, URL } =
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
    let response = await axios.post(`${URL}/api/placeorder`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container">
          <form onSubmit={handleSubmit(placeOrder)}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="col-span-2">
                <div className="px-3 py-5">
                  <h1 className="font-raleway text-2xl text-white">
                    Personal Information
                  </h1>
                  <hr className="border border-tetiary" />
                  <div className="my-4 flex flex-col gap-3">
                    <div>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Name"
                        className={`${errors.name ? "ring-red-600" : "ring-accent"} w-full rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2 md:w-72 lg:w-96`}
                      ></input>
                    </div>
                    <div className="flex flex-col justify-between gap-y-2 md:flex-row">
                      <input
                        type="text"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        placeholder="Email"
                        className={` ${errors.email ? "ring-red-600" : "ring-accent"} w-72 rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2`}
                      ></input>

                      <input
                        type="tel"
                        {...register("number", {
                          required: true,
                          pattern: /^\d+$/,
                        })}
                        placeholder="Phone Number"
                        className={` ${errors.number ? "ring-red-600" : "ring-accent"} w-72 rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2`}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-5">
                  <h1 className="font-raleway text-2xl text-white">
                    Shipping Address
                  </h1>
                  <hr className="border border-tetiary" />
                  <div className="my-6 flex flex-col gap-3">
                    <div className="flex flex-col justify-between gap-y-2 md:flex-row">
                      <input
                        type="text"
                        {...register("address", {
                          required: true,
                        })}
                        placeholder="Address"
                        className={`${errors.address ? "ring-red-600" : "ring-accent"} w-full rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2 md:w-96`}
                      ></input>
                      <input
                        type="text"
                        {...register("zipcode", {
                          required: true,
                        })}
                        placeholder="Zip Code"
                        className={` ${errors.zipcode ? "ring-red-600" : "ring-accent"} w-72 rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2`}
                      ></input>
                    </div>
                    <div className="flex flex-col justify-between gap-y-2 md:flex-row">
                      <input
                        type="text"
                        {...register("city", {
                          required: true,
                        })}
                        placeholder="City"
                        className={` ${errors.city ? "ring-red-600" : "ring-accent"} w-72 rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2`}
                      ></input>
                      <input
                        type="text"
                        {...register("country", {
                          required: true,
                        })}
                        placeholder="Country"
                        className={`${errors.country ? "ring-red-600" : "ring-accent"} w-72 rounded-full bg-secondary px-3 py-2 text-white outline-none ring-2`}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="px-3 py-5">
                  <h1 className="font-raleway text-2xl text-white">Item</h1>
                  <hr className="border border-tetiary" />
                  {products.map((product, i) => {
                    if (cartItems[product._id] > 0) {
                      return (
                        <>
                          <div
                            key={i}
                            className="relative flex flex-row justify-between py-2"
                          >
                            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-primary px-1 py-1 text-white">
                              {cartItems[product._id]}
                            </p>
                            <p className="font-lora text-white">
                              {product.name}
                            </p>
                            <p className="font-lora text-white">
                              $ {product.price * cartItems[product._id]}
                            </p>
                          </div>
                        </>
                      );
                    }
                  })}
                  <hr className="border border-tetiary" />
                  <div className="flex flex-col gap-3 py-3">
                    <div className="flex flex-row justify-between">
                      <p className="font-lora text-white">SubTotal </p>
                      <p className="font-lora text-white">
                        $ {getTotalCartAmount()}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="font-lora text-white">Discount </p>
                      <p className="font-lora text-white">$ {0}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="font-lora text-white">Shipping Fee </p>
                      <p className="font-lora text-white">
                        $ {getTotalCartAmount() === 0 ? 0 : 2}
                      </p>
                    </div>
                  </div>
                  <hr className="border border-tetiary" />
                  <div className="flex flex-row justify-between text-2xl">
                    <p className="font-raleway text-2xl text-white">Total </p>
                    <p className="font-lora text-2xl text-white">
                      $
                      {getTotalCartAmount() === 0
                        ? 0
                        : getTotalCartAmount() + 2}
                    </p>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <div>
                      <ButtonGreen
                        type="submit"
                        Text_Color={"white"}
                        Font={"raleway"}
                        Padding_Y={"10px"}
                        Padding_X={"32px"}
                        Text={"Checkout"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Order;
