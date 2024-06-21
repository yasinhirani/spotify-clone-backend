import express, { Request, Response } from "express";
import cors from "cors";
import homepageRouter from "./routes/homepage/homepage.routes";
import homepageDetailRouter from "./routes/homepage/homepageDetails.routes";
import userRouter from "./routes/user/user.routes";
import razorpayRouter from "./routes/razorpay/razorpay.routes";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/homepage", homepageRouter);
app.use("/api/homepage/detail", homepageDetailRouter);
app.use("/api/user", userRouter);
app.use("/api/create-subscription", razorpayRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Could not ${req.method} ${req.path}`,
    data: null,
  });
});

export default app;
