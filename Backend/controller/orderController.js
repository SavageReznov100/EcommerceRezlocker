dotenv.config();
import dotenv from "dotenv";
import Stripe from "stripe";
import orderModel from "../models/order.js";
import userModel from "../models/user.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const { items } = req.body;
  try {
    const newOrder = new orderModel({
      userId: req.body.id,
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      address: req.body.address,
      items: items,
      amount: req.body.amount,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.id, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `https://ecommercerezlockerfrontend.onrender.com/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `https://ecommercerezlockerfrontend.onrender.com/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Succesful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Unsuccesful" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export const updateSatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(
      { _id: req.body.orderId },
      { status: req.body.status }
    );
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Can Not Update Status" });
  }
};
