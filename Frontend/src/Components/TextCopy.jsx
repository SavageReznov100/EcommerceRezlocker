import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const TextCopy = () => {
  const overRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: overRef,
    offset: ["start end ", "start start"],
  });
  const x = useTransform(scrollYProgress, [0, 0.8, 0.9], [-500, -500, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 0.9], [0, 0, 1]);

  return (
    <motion.div
      style={{ opacity, x }}
      ref={overRef}
      className="absolute left-0 bottom-0 flex flex-col justify-center items-center h-screen w-full text-white"
    >
      <p className="mb-2 md:mb-4 text-xl mb:text-3xl text-center">Buy me Now</p>
    </motion.div>
  );
};

export default TextCopy;
