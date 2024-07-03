import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";

const getPlaylist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/playlists/${id}?market=IN`);

    res.status(200).json({
      success: true,
      message: "",
      data: {
        playlist: response.data,
      },
    });
  }
);

export { getPlaylist };
