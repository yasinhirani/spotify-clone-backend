import { NextFunction, Request, Response } from "express";
import ApiError from "./apiError";
import jwt from "jsonwebtoken";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    next(new ApiError("You are not authorized to perform this action", 401));
    return;
  }

  const userData = await jwt.verify(token ?? '', process.env.ACCESS_TOKEN_SECRET!);

  req.user = userData;

  next();
};
