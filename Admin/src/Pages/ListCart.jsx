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
      { id: productId },
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
      <div className="flex w-full flex-col bg-background">
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="my-8 flex items-center justify-center">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <IoMdSearch size={20} className="fill-white" />
            </span>
            <input
              className="block rounded-full bg-secondary py-2 pl-12 text-white shadow-sm placeholder:text-white"
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

        <div className="grid grid-cols-1 justify-between justify-items-center gap-y-2 rounded-md md:grid-cols-3 md:pl-5 lg:grid-cols-5">
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
                className="h-[300px] w-[175px] rounded-md bg-secondary"
              >
                <div className="relative h-[175px] w-full bg-lightgrey">
                  <img
                    src={updateproducts.imageFile}
                    className="h-full w-full object-cover object-center"
                    placeholder="blur"
                  />
                  {updateproducts.newCollection ? (
                    <p className="absolute left-1 top-1 flex items-center justify-center bg-black px-0.5 py-0.5 text-xs text-white">
                      NEW
                    </p>
                  ) : null}
                  <button
                    className="absolute right-1 top-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-latergator dark:hover:bg-black"
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
                        className="text-sm transition-all duration-300 dark:text-latergator"
                      />
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-y-2 pt-2 text-center dark:text-white">
                  <p>{updateproducts.name}</p>
                  <p className="truncate tracking-tight">
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
