import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingWhite from "../assets/loadingwhite.svg";
import LoadingBlack from "../assets/loadingblack.svg";

const NewsLetter = ({ theme, setTheme }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    email: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const response = await axios.post(
      `http://localhost:4000/api/newsubscribe`,
      { email: data.email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data.success) {
      setData({
        email: "",
      });
      setIsLoading(false);
      toast.success(response.data.message);
    } else {
      console.error("Submisson failed");
      toast.error(response.data.message);
      setIsLoading(false);
    }
    try {
    } catch (error) {
      console.log("Error in Submitting Form", error);
      toast.error("Something went wrong.Please try again.");
    }
  };
  return (
    <>
      <div className="container flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[428px] w-[1024px] md:h-[315px]  ">
          <div className="flex flex-col items-center justify-center gap-y-6 ">
            <h1 className="text-4xl font-medium text-center text-pretty w-[300px]">
              Subscribe to Our Newsletter
            </h1>
            <p className="text-base break-normal text-center md:text-left w-[264px] md:w-[395px]">
              Don't miss out on your discounts. Subscribe to our email
              newsletter to get the best offers, discounts, coupons, gifts and
              much more.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col md:flex-row gap-2 md:gap-0  items-center justify-center"
            >
              <input
                onChange={onChangeHandler}
                type="text"
                value={data.email}
                name="email"
                placeholder="Enter Your Email"
                className="ring-1 w-72 ring-slate-900/10 py-5 px-3 outline-none "
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-5 bg-latergator dark:text-white"
              >
                {isLoading ? (
                  <div>
                    <img src={LoadingBlack} className="h-6 w-6" />
                  </div>
                ) : (
                  <div>
                    <p className="">SUBSCRIBE</p>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
