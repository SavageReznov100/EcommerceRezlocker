import express from "express";
import { loginUser, signupUser } from "../controller/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

export default router;
