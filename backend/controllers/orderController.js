import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";

// place order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// initiate eSewa payment
const initiateEsewaPayment = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const pid = "ESW" + Date.now();

    const successUrl = `http://localhost:5000/api/order/verify-esewa?userId=${userId}&pid=${pid}&items=${encodeURIComponent(
      JSON.stringify(items)
    )}&amount=${amount}&address=${encodeURIComponent(address)}`;

    const failureUrl = `http://localhost:3000/payment-failure`;

    const esewaUrl = `https://uat.esewa.com.np/epay/main?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&pid=${pid}&scd=EPAYTEST&su=${encodeURIComponent(
      successUrl
    )}&fu=${encodeURIComponent(failureUrl)}`;

    res.json({ success: true, esewaUrl });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify eSewa payment
const verifyEsewaPayment = async (req, res) => {
  try {
    const { userId, pid, amount, items, address } = req.query;

    const parsedItems = JSON.parse(decodeURIComponent(items));
    const parsedAddress = decodeURIComponent(address);

    const xmlData = `
      <esewa:paymentVerificationRequest xmlns:esewa="http://www.esewa.com.np">
        <esewa:merchantCode>EPAYTEST</esewa:merchantCode>
        <esewa:pid>${pid}</esewa:pid>
        <esewa:amount>${amount}</esewa:amount>
      </esewa:paymentVerificationRequest>
    `;

    const response = await axios.post(
      "https://uat.esewa.com.np/epay/transrec",
      xmlData,
      {
        headers: {
          "Content-Type": "text/xml",
        },
      }
    );

    if (response.data.includes("<response_code>Success</response_code>")) {
      const orderData = {
        userId,
        items: parsedItems,
        amount,
        address: parsedAddress,
        paymentMethod: "eSewa",
        payment: true,
        date: Date.now(),
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.redirect("http://localhost:3000/order-success");
    } else {
      res.redirect("http://localhost:3000/payment-failure");
    }
  } catch (error) {
    console.log(error);
    res.redirect("http://localhost:3000/payment-failure");
  }
};
// handle eSewa success callback
const esewaSuccess = async (req, res) => {
  try {
    const { amt, pid, refId } = req.body;

    // Save the payment details to database if needed
    // You can verify the payment here using eSewa transaction verify API (optional but recommended)

    console.log("Esewa payment success:", { amt, pid, refId });

    // Optionally update order status in DB
    res.status(200).json({
      success: true,
      message: "Esewa Payment successful",
      data: { amt, pid, refId },
    });
  } catch (err) {
    console.error("Esewa Success Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// placeholder for Stripe integration
const placeOrderStripe = async (req, res) => {
  res.json({ success: false, message: "Stripe not integrated yet." });
};

const verifyStripe = async (req, res) => {
  res.json({ success: false, message: "Stripe verification not implemented." });
};

// admin: get all orders
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user: get orders by userId
const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status (admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrder,
  userOrder,
  updateStatus,
  initiateEsewaPayment,
  verifyEsewaPayment,
  esewaSuccess,
};
