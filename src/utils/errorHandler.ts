import { NextFunction, Request, Response } from "express";
import ApiError from "./apiError";

const handleJwtTokenError = () => {
  return new ApiError("Provided token is invalid.", 401);
};

const handleJwtExpireError = () => {
  return new ApiError(
    "Verification link has expired, try with the new link",
    400
  );
};

const errorResponseDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    success: false,
    // error: err,
    message: err.message,
    data: null,
  });
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  let error: any = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(err)
  );
  if (err.name === "JsonWebTokenError") error = handleJwtTokenError();
  if (err.name === "TokenExpiredError") {
    res.send("Verification link has expired, try with the new link");
    return;
  };

  errorResponseDev(error, res);
};

export default errorHandler;
