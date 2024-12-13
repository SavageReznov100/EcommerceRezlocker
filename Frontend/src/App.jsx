import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./Authentication/store/reducer/auth";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import NewCollection from "./Pages/NewCollection";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Verify from "./Pages/Verify";
import UserOrders from "./Pages/UserOrders";
import Layout from "./Layout/layout";
import ProtectedRoutes from "./Authentication/ProtectedRoutes";
import AuthenticatedRoutes from "./Authentication/AuthenticatedRoutes";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  const [activeTab, setActiveTab] = useState(navbar[0].id);

  return (
    <>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route element={<AuthenticatedRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/order" element={<Order />} />
              <Route path="/verify" element={<Verify />} />
              <Route
                path="/myorders"
                element={
                  <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                    <UserOrders />
                  </Layout>
                }
              />
            </Route>
            <Route
              path="/"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <HomePage activeTab={activeTab} setActiveTab={setActiveTab} />
                </Layout>
              }
            />
            <Route
              path="/product"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Product />
                </Layout>
              }
            />
            <Route
              path="/product/:name"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/newcollection"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <NewCollection />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Cart />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
