import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Upload from "../assets/uploadfield.svg";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBlack from "../assets/loadingblack.svg";
import classNames from "classnames";

const AddCart = () => {
  const url = "http://localhost:4000";
  const [isSelected, setIsSelected] = useState(false);
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [image, setImage] = useState("null");
  const [isLoading, setIsLoading] = useState(null);
  const [imageUrl, setImageUrl] = useState(Upload);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "Luxury Watches",
    imageFile: null,
    color: "",
    features: "",
    inStock: false,
    newCollection: false,
  });
  console.log(data);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "inStock" || name !== "newCollection") {
      setData((data) => ({ ...data, [name]: value }));
    }
  };
  const onToggleSwitch = () => {
    setIsSelected((prev) => {
      const newValue = !prev;
      setData((prevData) => ({ ...prevData, inStock: newValue }));
      return newValue;
    });
  };
  const onToggleSwitchNewCollection = () => {
    setIsNewCollection((prev) => {
      const newValue = !prev;
      setData((prevData) => ({ ...prevData, newCollection: newValue }));
      return newValue;
    });
  };
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setImage(file);
      setData((prevData) => ({ ...prevData, imageFile: file }));
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("brand", data.brand);
    formData.append("imageFile", data.imageFile);
    formData.append("category", data.category);
    formData.append("color", data.color);
    formData.append("features", data.features);
    formData.append("inStock", Boolean(data.inStock));
    formData.append("newCollection", Boolean(data.newCollection));

    const response = await axios.post(
      `http://localhost:4000/api/product/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        brand: "",
        category: "Luxury Watches",
        price: "",
        imageFile: null,
        color: "",
        features: "",
        inStock: false,
        newCollection: false,
      });
      setIsLoading(false);
      setImage(null);
      setImageUrl(Upload);
      toast.success(response.data.message);
    } else {
      console.error("Submission failed");
      toast.error(response.data.message);
      setIsLoading(false);
    }
    try {
    } catch (error) {
      console.log("Error in Submitting Form", error);
    }
  };
  console.log(isLoading);

  return (
    <>
      <div className="flex flex-col w-full ">
        <div>
          <Navbar />
        </div>
        <div className=" w-full py-10  pl-2 md:pl-10 ">
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5">
            <h1 className="text-xl md:text-3xl ">Product Information</h1>
            <div>
              <p className=" py-2">Product Name</p>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Type here..."
                className="ring-1 w-72 ring-slate-900/10 py-1 px-3 outline-none "
              />
            </div>
            <div>
              <p className=" py-2">Product Description</p>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                className="ring-1 w-60 md:w-96 ring-slate-900/10 py-1 px-3 outline-none"
                type="text"
                name="description"
                rows={"6"}
                placeholder="Write description here..."
                required
              />
            </div>
            <div>
              <p className=" py-2">Product Features</p>
              <textarea
                onChange={onChangeHandler}
                value={data.features}
                className="ring-1 w-60 md:w-96 ring-slate-900/10 py-1 px-3 outline-none"
                type="text"
                name="features"
                rows={"6"}
                placeholder="Write features here..."
                required
              />
            </div>
            <div>
              <p className="py-2">Product Brand</p>
              <input
                onChange={onChangeHandler}
                value={data.brand}
                type="text"
                name="brand"
                placeholder="Type Brand Name Here"
                className="ring-1 w-72 ring-slate-900/10 py-1 px-3 outline-none"
              />
            </div>
            <div>
              <p className="py-2">Product Color</p>
              <input
                onChange={onChangeHandler}
                value={data.color}
                type="text"
                name="color"
                placeholder="Type Brand Name Here"
                className="ring-1 w-72 ring-slate-900/10 py-1 px-3 outline-none"
              />
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className=" py-2">Product In Stock</p>

              <div
                onClick={onToggleSwitch}
                className={classNames(
                  "flex w-10 h-5 bg-gray-600 m-5 rounded-full transition-all duration-500",
                  { "bg-green-500": isSelected }
                )}
              >
                <span
                  className={classNames(
                    "h-5 w-5  rounded-full transition-all duration-500",
                    {
                      "ml-5": isSelected,
                    }
                  )}
                ></span>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <p className=" py-2">New Collection</p>

              <div
                onClick={onToggleSwitchNewCollection}
                className={classNames(
                  "flex w-10 h-5 bg-gray-600 m-5 rounded-full transition-all duration-500",
                  { "bg-green-500": isNewCollection }
                )}
              >
                <span
                  className={classNames(
                    "h-5 w-5 bg-white rounded-full transition-all duration-500",
                    {
                      "ml-5": isNewCollection,
                    }
                  )}
                ></span>
              </div>
            </div>
            <div className="w-40 ">
              <p className=" py-3">Product Image</p>
              <label htmlFor="imageFile">
                <img src={imageUrl} alt="" className="h-20" />
              </label>
              <input
                onChange={onImageChange}
                type="file"
                id="imageFile"
                hidden
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-x-5 ">
              <div>
                <p className=" py-2">Product Category</p>
                <select
                  onChange={onChangeHandler}
                  value={data.category}
                  name="category"
                  className="ring-1 w-40 ring-slate-900/10 py-1 px-3 outline-none"
                >
                  <option value="Luxury Watches">Luxury Watches</option>
                  <option value="Sport Watches">Sports Watches</option>
                  <option value="Smart Watches">Smartwatches</option>
                  <option value="Vintage Watches">Vintage Watches</option>
                  <option value="Watch Acessories">Watch Accessories</option>
                </select>
              </div>
              <div>
                <p className="py-2">Product Price </p>
                <input
                  onChange={onChangeHandler}
                  value={data.price}
                  type="number"
                  placeholder="$20"
                  name="price"
                  className="ring-1 w-40 ring-slate-900/10 py-1 px-3 outline-none"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="px-7 py-3 bg-latergator dark:text-white rounded-l-full rounded-r-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-x-3 ">
                    <img src={LoadingBlack} className="h-6 w-6" />

                    <p className="">Processing...</p>
                  </div>
                ) : (
                  <div className="flex gap-x-3 items-center">
                    <FaPlus />
                    <p className="">Add Product</p>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCart;
