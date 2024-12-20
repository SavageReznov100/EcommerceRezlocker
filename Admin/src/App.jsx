import { React,useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import AddCart from "./Pages/AddCart";
import ListCart from "./Pages/ListCart";
import Order from "./Pages/Order";
import Navbar from "./Components/Navbar";
import { AnimatePresence } from "framer-motion";

function App() {
   const [MenuOpen, setMenuOpen] = useState(false);
  console.log(MenuOpen)
   const toggleMenu = () => {
   setMenuOpen(!MenuOpen);
 };
  return (
    <>
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <ToastContainer />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col w-full">   
            <Navbar  toggleMenu={toggleMenu} MenuOpen={MenuOpen}/>
            <Routes>
            <Route path="/" element={<AddCart />} />
            <Route path="/list" element={<ListCart />} />
            <Route path="/order" element={<Order />} />
          </Routes>
          </div>
    
      
        </div>
      </BrowserRouter>
    </AnimatePresence>
      
    </>
  );
}

export default App;
