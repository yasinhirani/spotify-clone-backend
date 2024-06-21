import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import razorpay from "../../utils/razorpay";

const createSubscription = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = {
      plan_id: "plan_OP0mr3mklJMhZt",
      total_count: 6,
      quantity: 1,
      customer_notify: true,
      start_at: Math.floor(Date.now() / 1000),
    };

    const response = await razorpay.subscriptions.create(params);
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: {
        subscriptionId: response.id,
      },
    });
  }
);

export { createSubscription };
