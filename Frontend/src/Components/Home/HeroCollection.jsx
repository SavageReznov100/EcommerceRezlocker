import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import HeroTab from "./HeroTab";

const HeroCollection = () => {
  const { products } = useContext(ProductContext);
  const newCollection = products.filter(
    (product) => !product.newCollection && !product.inStock,
  );
  return (
    <div className="bg-background">
      <h1 className="flex items-center justify-center pt-8 font-raleway text-4xl uppercase tracking-widest text-white">
        New Collection
      </h1>
      <div className="grid grid-cols-1 justify-items-center gap-4 py-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {newCollection.map((products, i) => {
          return <HeroTab products={products} key={i} />;
        })}
      </div>
    </div>
  );
};

export default HeroCollection;
