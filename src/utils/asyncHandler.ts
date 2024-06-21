import { NextFunction, Request, Response } from "express";

const asyncHandler = (fn: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message, data: null });
    }
  };
};

export default asyncHandler;