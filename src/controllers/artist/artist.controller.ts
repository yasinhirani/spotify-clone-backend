import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";

const getArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/artists/${id}`);

    res.status(200).json({
      success: true,
      message: "",
      data: {
        artist: response.data,
      },
    });
  }
);

const getArtistTopTracks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/artists/${id}/top-tracks`);

    res.status(200).json({
      success: true,
      message: "",
      data: {
        tracks: response.data.tracks,
      },
    });
  }
);

export { getArtist, getArtistTopTracks };
