import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import popularArtists from "../../../data/popularArtists";
import popularAlbums from "../../../data/popularAlbums";
import popularRadios from "../../../data/popularRadios";
import featuredCharts from "../../../data/featuredCharts";
import ApiResponse from "../../../utils/apiResponse";

const getPopularArtists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(popularArtists));
  }
);

const getPopularAlbums = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(popularAlbums));
  }
);

const getPopularRadios = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(popularRadios));
  }
);

const getFeaturedCharts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(new ApiResponse(featuredCharts));
  }
);

export {
  getPopularArtists,
  getPopularAlbums,
  getPopularRadios,
  getFeaturedCharts,
};
