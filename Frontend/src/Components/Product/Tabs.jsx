import { spring } from "framer-motion";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Tabs = ({ features, description }) => {
  const tab = [
    { id: 1, name: "Description" },
    { id: 2, name: "Features" },
  ];
  const [isactiveTab, setisActiveTab] = useState(tab[0].id);

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex gap-5 mb-5 ">
        {tab.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setisActiveTab(tab.id)}
            className={`${isactiveTab === tab.id ? "text-black" : "text-[#686363]"} relative `}
          >
            {isactiveTab === tab.id && (
              <motion.hr
                layoutId="active-line"
                className="absolute bottom-0 inset-x-0 bg-latergator h-1 mt-1"
                transition={{ type: spring, duration: 0.5 }}
              />
            )}
            <p className="relative z-10">{tab.name}</p>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div>
          {isactiveTab === tab[0].id && (
            <p className="tracking-widest leading-loose text-pretty indent-8">
              {description}
            </p>
          )}
          {isactiveTab === tab[1].id && (
            <p className="tracking-widest leading-loose text-pretty">
              {features}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
