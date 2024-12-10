import { React, useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { IoMdSearch } from "react-icons/io";
import Shoppage from "../Components/Product/Shoppage.jsx";

const Product = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  console.log(products);
  return (
    <>
      <div className="bg-background py-10">
        <div className="flex items-center justify-center">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <IoMdSearch size={20} className="fill-slate-300" />
            </span>
            <input
              className="block rounded-full border border-slate-300 bg-white py-2 pl-12 shadow-sm placeholder:text-slate-400"
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
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((updateproducts) => {
              if (search == "") {
                return updateproducts;
              } else if (
                updateproducts.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return updateproducts;
              }
            })

            .map((updateproducts, i) => {
              return <Shoppage updateproducts={updateproducts} key={i} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Product;
