import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FaBox } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(ProductContext);
  const URL = "https://ecommercerezlocker.onrender.com";

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/order`,
        {},
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <section className="bg-background py-10 min-h-[50vh]">
      <div className="container">
        <h1 className="flex items-center justify-center font-playfair text-4xl uppercase tracking-widest text-white">
          My Orders
        </h1>
        <table className="mt-8 w-full">
          <thead>
            <tr className="border-b-2 border-tetiary text-start text-white">
              <th className="hidden border-r-2 border-tetiary p-1 text-left font-raleway sm:table-cell">
                Package
              </th>
              <th className="border-r-2 border-tetiary p-1 text-left font-raleway">
                Title
              </th>
              <th className="border-r-2 border-tetiary p-1 text-left font-raleway">
                Price
              </th>
              <th className="font-ralewaytext-left border-r-2 border-tetiary p-1 text-left">
                Quantity
              </th>
              <th className="font-ralewaytext-center border-r-2 border-tetiary p-1 text-left">
                Status
              </th>
              <th className="border-r-2 border-tetiary p-1 text-left font-raleway">
                Track
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data, i) => {
              return (
                <tr key={i}>
                  <td className="border-2 border-tetiary p-6 text-left">
                    <FaBox className="hidden border-tetiary p-1 text-2xl text-white sm:table-cell" />
                  </td>
                  <td className="border-2 border-tetiary p-1 font-lora text-white">
                    <p>
                      {data.items.map((item, index) => {
                        if (index === data.items.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + " , ";
                        }
                      })}
                    </p>
                  </td>
                  <td className="border-2 border-tetiary p-1 font-lora text-white">
                    ${data.amount}
                  </td>
                  <td className="border-2 border-tetiary p-1 text-center font-lora text-white">
                    {data.items.length}
                  </td>

                  <td className="border-2 border-tetiary p-1 text-center font-lora text-white">
                    <p className="flex items-center justify-center gap-x-2">
                      <span className="hidden lg:flex">&#x25cf;</span>
                      <b>{data.status}</b>
                    </p>
                  </td>
                  <td className="border-2 border-tetiary p-1 text-center font-lora text-white">
                    <button
                      onClick={fetchOrders}
                      className="rounded-sm bg-primary px-5 py-2"
                    >
                      Track <span className="hidden lg:flex">Order</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserOrders;
