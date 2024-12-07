import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { toast } from "react-toastify";

const Order = ({}) => {
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
      <div className="flex flex-col w-full bg-background">
        <Navbar />
        <h4 className="uppercase text-white">Order Page</h4>
        <div className="overflow-auto mt-5">
          <table className="w-full">
            <thead>
              <tr className="border-b-2  border-tetiary text-start text-white">
                <th className="p-1 text-left border-r-2 border-tetiary  hidden sm:flex">
                  Package
                </th>
                <th className="p-1 text-left border-r-2 border-tetiary ">
                  Order
                </th>
                <th className="p-1 text-left border-r-2 border-tetiary ">
                  Items
                </th>
                <th className="p-1 text-left border-r-2 border-tetiary  ">
                  Price
                </th>
                <th className="p-1 text-left border-r-2 border-tetiary  ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((data, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b-2 border-tetiary p-6 text-left"
                  >
                    <td className="p-1 border-r-2 hidden  border-tetiary  text-white sm:table-cell">
                      <FaBox />
                    </td>
                    <td className="p-1  border-r-2 border-tetiary ">
                      <div className="p-2 text-white">
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
                      <hr className="w-full" />
                      <div className="text-white">
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
                    <td className="p-1 text-white  border-r-2 border-tetiary ">
                      {data.items.length}
                    </td>
                    <td className="p-1 text-white border-r-2 border-tetiary  ">
                      ${data.amount}
                    </td>
                    <td className="p-1  border-r-2 border-tetiary ">
                      <select
                        onChange={(event) => onChangeHandler(event, data._id)}
                        value={data.status}
                        name="status"
                        className="bg-primary text-white p-1 text-sm max-w-20 xl:max-w-32 rounded-full"
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
