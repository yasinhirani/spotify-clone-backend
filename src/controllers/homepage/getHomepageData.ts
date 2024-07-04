import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import fs from "fs";
import homepageData from "../../data/homepageData";
import ApiResponse from "../../utils/apiResponse";

const getHomepageData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(homepageData));
  }
);

export { getHomepageData };
