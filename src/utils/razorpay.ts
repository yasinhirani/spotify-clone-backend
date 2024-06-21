import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YBlEH7KFuHj04V",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "s4Y66DzDyEg2QxpbbzScIfOu",
});

export default razorpay;
