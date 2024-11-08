import { React, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import LoadingGreen from "../assets/loadinggreen.svg";
import LoadingBlack from "../assets/loadingblack.svg";

const ListCart = ({ theme, setTheme }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [search, setSearch] = useState("");

  const fetchList = async () => {
    const response = await axios.get(`http://localhost:4000/api/product/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeProduct = async (productId) => {
    setIsLoading(true);
    const response = await axios.post(
      `http://localhost:4000/api/product/remove`,
      { id: productId }
    );
    await fetchList();
    if (response.data.succes) {
      toast.success(response.data.message);
      setIsLoading(false);
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full  ">
        <Navbar theme={theme} setTheme={setTheme} />
        <div className=" flex justify-center items-center my-8">
          <label className="relative block ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <IoMdSearch size={20} className="fill-slate-300" />
            </span>
            <input
              className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-full py-2 pl-12 shadow-sm  "
              placeholder="Search"
              type="text"
              name="src"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center rounded-md justify-between gap-y-2 md:pl-5 ">
          {list
            .filter((updateproducts) => {
              if (search == "") {
                return updateproducts;
              } else if (
                updateproducts.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return updateproducts;
              }
            })
            .map((updateproducts) => (
              <div
                key={updateproducts.id}
                className="w-[175px] h-[300px] bg-latergator rounded-md"
              >
                <div className="w-full h-[175px] relative  bg-lightgrey ">
                  <img
                    src={updateproducts.imageFile}
                    className=" object-center object-cover rounded-t-md w-full h-full "
                    placeholder="blur"
                  />
                  {updateproducts.newCollection ? (
                    <p className="text-white absolute top-1 left-1 flex justify-center items-center py-0.5 px-0.5 bg-black text-xs">
                      NEW
                    </p>
                  ) : null}
                  <button
                    className="absolute top-1 right-1 flex justify-center items-center w-7 h-7 rounded-full bg-transparent hover:bg-latergator cursor-pointer dark:hover:bg-black "
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div>
                        {theme === "dark" ? (
                          <img src={LoadingGreen} className="h-4 w-4" />
                        ) : (
                          <img src={LoadingBlack} className="h-4 w-4" />
                        )}
                      </div>
                    ) : (
                      <FaTrash
                        onClick={() => removeProduct(updateproducts._id)}
                        className="dark:text-latergator text-sm transition-all duration-300"
                      />
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-y-2 pt-2 text-center dark:text-white">
                  <p>{updateproducts.name}</p>
                  <p className="tracking-tight truncate">
                    {updateproducts.description}
                  </p>
                  <p> ${updateproducts.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListCart;
