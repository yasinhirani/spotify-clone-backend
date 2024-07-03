import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";

const search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;

    const response = await axiosInstance.get(
      `/v1/search?q=${query}&type=album,track,artist,playlist&limit=10&offset=0`
    );

    res.status(200).json({
      success: true,
      message: "",
      data: {
        result: response.data,
      },
    });
  }
);

export { search };
