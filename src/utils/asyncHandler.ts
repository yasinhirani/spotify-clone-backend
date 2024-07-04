import { NextFunction, Request, Response } from "express";
import ApiError from "./apiError";

const asyncHandler = (fn: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
};

export default asyncHandler;
