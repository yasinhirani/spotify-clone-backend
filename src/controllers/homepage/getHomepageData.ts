import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import fs from "fs";

const getHomepageData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const homepageData = await fs.promises.readFile(
      "src/json/homepageData.json",
      { encoding: "utf-8" }
    );
    res.status(200).json({
      success: true,
      message: "",
      data: JSON.parse(homepageData),
    });
  }
);

export { getHomepageData };
