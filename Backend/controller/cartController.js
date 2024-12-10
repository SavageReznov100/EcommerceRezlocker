import userModel from "../models/user.js";

export const addCart = async (req, res) => {
  try {
    const userData = await userModel.findById({ _id: req.body.id });

    if (!userData) {
      return res.json({ success: false, message: "Can not get User" });
    }

    const cartData = (await userData.cartData) || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.id, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: "Not Added to Cart" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.id);

    if (!userData) {
      return res.json({ success: false, message: "Can not get User" });
    }

    const cartData = (await userData.cartData) || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] > 0;
    } else {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.id, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Removed from Cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.id);

    if (!userData) {
      return res.json({ success: false, message: "Can not get User" });
    } else {
      return res.json({ success: true, cartData: userData.cartData });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Can Not Get Cart Data" });
  }
};
