import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FaBox } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(ProductContext);
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order",
        {},
        {
          headers: { token },
        }
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
  console.log(orders);

  return (
    <section className="container pt-20">
      <div>
        <h4>My Orders</h4>

        <table className="w-full mt-8">
          <thead>
            <tr className="border-b-black border-r-slate-900/20  regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left hidden sm:table-cell">Package</th>
              <th className="p-1 text-left ">Title</th>
              <th className="p-1 text-left ">Price</th>
              <th className="p-1 text-left">Quantity</th>
              <th className="p-1 text-center">Status</th>
              <th className="p-1 text-left">Track</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data, i) => {
              return (
                <tr key={i}>
                  <td className=" p-1 hidden sm:table-cell">
                    <FaBox className="text-2xl text-latergator" />
                  </td>
                  <td className="p-1">
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
                  <td className="p-1">${data.amount}</td>
                  <td className="p-1 text-center">{data.items.length}</td>

                  <td>
                    <p className="flex items-center justify-center gap-x-2">
                      <span className="hidden lg:flex">&#x25cf;</span>
                      <b>{data.status}</b>
                    </p>
                  </td>
                  <td className="p-1">
                    <button
                      onClick={fetchOrders}
                      className="bg-latergator rounded-sm px-5 py-2"
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
