import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";
import ApiResponse from "../../utils/apiResponse";

const getArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/artists/${id}`);

    res.status(200).json(new ApiResponse({ artist: response.data }));
  }
);

const getArtistTopTracks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const response = await axiosInstance.get(`/v1/artists/${id}/top-tracks`);

    res.status(200).json(new ApiResponse({ tracks: response.data.tracks }));
  }
);

export { getArtist, getArtistTopTracks };
