import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import Collection from "../Components/Collection";

const NewCollection = () => {
  const { products } = useContext(ProductContext);
  const newCollection = products.filter((product) => product.newCollection);
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
        {newCollection.map((products, i) => {
          return <Collection products={products} key={i} />;
        })}
      </div>
    </div>
  );
};

export default NewCollection;
