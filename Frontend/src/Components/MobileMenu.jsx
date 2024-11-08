import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const StaggeredDropDown = ({ toggleMenu }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    closed: {
      transition: {
        when: "afterChildren",
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        key="menu"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed top-0 w-screen h-screen z-20 md:hidden  bg-white"
      >
        <div className="relative">
          <div className="absolute top-10 right-6 text-2xl">
            <IoClose className=" hover:text-latergator" onClick={toggleMenu} />
          </div>
          <motion.ul
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-center justify-center  gap-y-12 pt-40"
          >
            <Option toggleMenu={toggleMenu} text="Home" link="/" />
            <Option toggleMenu={toggleMenu} text="Product" link="/product" />
            <Option
              toggleMenu={toggleMenu}
              text="New Collection"
              link="/newcollection"
            />
            <Option toggleMenu={toggleMenu} text="Remove" />
          </motion.ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Option = ({ text, toggleMenu, link }) => {
  const linkVariants = {
    close: { y: 100, opacity: 0, transition: { when: "afterChildren" } },
    open: { y: 0, opacity: 1, transition: { when: "beforeChildren" } },
  };
  return (
    <motion.li
      variants={linkVariants}
      initial="close"
      animate="open"
      exit="close"
      onClick={toggleMenu}
      className="flex items-center justify-center gap-2 w-full p-2  text-base font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-sky-500 transition-colors cursor-pointer"
    >
      <Link to={link}>
        <span>{text}</span>
      </Link>
    </motion.li>
  );
};

export default StaggeredDropDown;
