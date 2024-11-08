import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import AddCart from "./Pages/AddCart";
import ListCart from "./Pages/ListCart";
import Order from "./Pages/Order";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<AddCart />} />
            <Route path="/list" element={<ListCart />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
