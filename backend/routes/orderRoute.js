import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrder,
  userOrder,
  updateStatus,
  initiateEsewaPayment,
  verifyEsewaPayment,
  esewaSuccess,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin routes
orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment routes
orderRouter.post("/place", authUser, placeOrder); // COD
orderRouter.post("/stripe", authUser, placeOrderStripe); // Stripe
orderRouter.post("/verifystripe", authUser, verifyStripe); // Stripe verification
orderRouter.post("/initiate-esewa", authUser, initiateEsewaPayment); // eSewa Start
orderRouter.get("/verify-esewa", verifyEsewaPayment); // eSewa Verification (no auth for redirect)

orderRouter.post("/esewa-success", esewaSuccess);

// User routes
orderRouter.post("/userorders", authUser, userOrder);

export default orderRouter;
