import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { toast } from "react-toastify";

const Order = ({ theme, setTheme }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/listorder");
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
    fetchOrders();
  }, []);
  console.log(orders);
  const onChangeHandler = async (event, orderId) => {
    const response = await axios.post("http://localhost:4000/api/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchOrders();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(event, orderId);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <Navbar theme={theme} setTheme={setTheme} />
        <h4 className="uppercase">Order Page</h4>
        <div className="overflow-auto mt-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-900 text-start pu-12">
                <th className="p-1 text-left hidden sm:flex">Package</th>
                <th className="p-1 text-left ">Order</th>
                <th className="p-1 text-left ">Items</th>
                <th className="p-1 text-left ">Price</th>
                <th className="p-1 text-left ">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((data, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b-black border-r-slate-900 p-6 text-left"
                  >
                    <td className="p-1 hidden sm:table-cell">
                      <FaBox />
                    </td>
                    <td className="p-1">
                      <div className="p-2">
                        <p>
                          {data.items.map((item, index) => {
                            if (index === data.items.length - 1) {
                              return item.name + " x " + item.quantity;
                            } else {
                              return item.name + " x " + item.quantity + " , ";
                            }
                          })}
                        </p>
                      </div>
                      <hr className="w-2/3" />
                      <div>
                        <h5>{data.name}</h5>
                        <div>
                          <p>
                            {data.address.street +
                              " , " +
                              data.address.city +
                              " , " +
                              data.address.country +
                              " , " +
                              data.address.zipcode}
                          </p>
                        </div>
                        <p>{data.number}</p>
                      </div>
                    </td>
                    <td className="p-1">{data.items.length}</td>
                    <td className="p-1">${data.amount}</td>
                    <td className="p-1">
                      <select
                        onChange={(event) => onChangeHandler(event, data._id)}
                        value={data.status}
                        name="status"
                        className="bg-primary ring-1 ring-latergator text-sm max-w-20 xl:max-w-28"
                      >
                        <option value="Product Loading">Product Loading</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Order;
