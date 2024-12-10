import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await getCart(storedToken);
      }
    }
    loadData();
  }, []);

  console.log("token is ", token);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        "http://localhost:4000/api/addcart",
        { itemId },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        "http://localhost:4000/api/deletecart",
        { itemId },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const getCart = async (token) => {
    const response = await axios.get("http://localhost:4000/api/getcart", {
      headers: { token },
    });
    setCartItems(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find(
          (totalproduct) => totalproduct._id === item,
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with ID ${item} not found in products.`);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/product/list`,
      );
      if (response.data.success) {
        setProducts(response.data.data);
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        removeFromCart,
        addToCart,
        setCartItems,
        cartItems,
        getTotalCartAmount,
        token,
        setToken,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
