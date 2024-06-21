import app from "./app";
import dotenv from "dotenv";
import connect from "./db/db";
import Razorpay from "razorpay";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.log(error.message);
    process.exit(1);
  });
