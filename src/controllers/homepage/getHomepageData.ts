import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import fs from "fs";
import homepageData from "../../data/homepageData";

const getHomepageData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "",
      data: homepageData,
    });
  }
);

export { getHomepageData };
