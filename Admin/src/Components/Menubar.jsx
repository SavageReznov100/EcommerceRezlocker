import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

import React from "react";
const Menubar = ({ MenuOpen,toggleMenu }) => {
     const container = {
       initial: { opacity: 0 },
       animate: {
         opacity: 1,
         transition: {
           when: "beforeChildren",
           staggerChildren: 0.4,
           staggerDirection: 1,
           duration: 0.3,
         },
       },
       exit: {
         opacity: 0,
         transition: {
           when: "afterChildren",
           staggerChildren: 0.4,
           staggerDirection: -1,
           delay: 0.1,
           duration:0.3,         },
       },
     };

     const item = {
       initial: { opacity: 0, x: 15 },
       animate: {
         opacity: 1,
         x: 0,
         transition: {
           ease: "easeInOut",
           duration: 0.2,
         },
       },
       exit: {
         opacity: 0,
         x: -15,
         transition: {
           ease: "easeInOut",
           duration: 0.2,
           delay: 0.1,
         },
       },
     };

  const itemVariants = {
    initial: {
      opacity: 0,
      width: 0,
    },
    animate: {
      opacity: 1,
      width: "60%",
      transition: { duration: 0.3, ease: "easeInOut", when: "beforeChildren" },
    },
    exit: {
      opacity: 0,
      width: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };
  return (
    <>
      <AnimatePresence>
        {MenuOpen && (
          <motion.div
            key="menu"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed right-0 top-0 z-20 h-full min-h-screen border-l border-solid border-tetiary bg-secondary"
          >
            <div className="relative">
              <div className="absolute right-8 top-6">
                <IoClose
                  className="text-white hover:text-primary"
                  size={32}
                  onClick={toggleMenu}
                />  </div>
                <motion.ul
                  variants={container}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center gap-y-16 pt-32"
                >
                  <Link to="/">
                    <motion.li
                      onClick={toggleMenu}
                      variants={item}
                      className="cursor-pointer font-lora text-xl uppercase text-white transition-colors hover:text-accent"
                    >
                Add Product
                    </motion.li>
                  </Link>
                  <Link to="/list">
                    <motion.li
                      onClick={toggleMenu}
                      variants={item}
                      className="cursor-pointer font-lora text-xl uppercase text-white transition-colors hover:text-accent"
                    >
                  List Product
                    </motion.li>
                  </Link>
                  <Link to="/order">
                    <motion.li
                      onClick={toggleMenu}
                      variants={item}
                      className="cursor-pointer font-lora text-xl uppercase text-white transition-colors hover:text-accent"
                    >
                    Orders
                    </motion.li>
                  </Link>
                </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menubar;
