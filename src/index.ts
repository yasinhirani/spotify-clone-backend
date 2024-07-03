import app from "./app";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import runStartupQuery from "./utils/startupQuery";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

runStartupQuery();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
