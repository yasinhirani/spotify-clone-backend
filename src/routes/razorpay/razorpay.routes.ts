import express from "express";
import { createSubscription } from "../../controllers/razorpay/razorpay";

const router = express.Router();

router.route("/").get(createSubscription);

export default router;
