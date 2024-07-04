import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";
import ApiResponse from "../../utils/apiResponse";

const getPlaylist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/playlists/${id}?market=IN`);

    res.status(200).json(new ApiResponse({ playlist: response.data }));
  }
);

export { getPlaylist };
