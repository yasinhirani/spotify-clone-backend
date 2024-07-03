import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";

const getAlbum = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/albums/${id}`);

    res.status(200).json({
      success: true,
      message: "",
      data: {
        album: response.data,
      },
    });
  }
);

export { getAlbum };
