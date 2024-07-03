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

const getFeaturedPlaylists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit } = req.query;
    const response = await axiosInstance.get(
      `/v1/browse/featured-playlists?locale=IN&limit=${limit}&offset=0`
    );

    res.status(200).json({
      success: true,
      message: "",
      data: {
        featuredPlaylists: response.data,
      },
    });
  }
);

export { getPlaylist, getFeaturedPlaylists };
