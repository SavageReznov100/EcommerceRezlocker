import express from "express";
import {
  listOrders,
  placeOrder,
  updateSatus,
  userOrders,
  verifyOrder,
} from "../controller/orderController.js";
import { authMiddlewear } from "../middlewear/auth.js";
const router = express.Router();

router.post("/placeorder", authMiddlewear, placeOrder);
router.post("/verify", verifyOrder);
router.post("/order", authMiddlewear, userOrders);
router.post("/listorder", listOrders);
router.post("/status", updateSatus);

export default router;
