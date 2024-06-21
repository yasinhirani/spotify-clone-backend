import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import popularArtists from "../../../data/popularArtists";
import popularAlbums from "../../../data/popularAlbums";
import popularRadios from "../../../data/popularRadios";
import featuredCharts from "../../../data/featuredCharts";

const getPopularArtists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "",
      data: popularArtists,
    });
  }
);

const getPopularAlbums = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "",
      data: popularAlbums,
    });
  }
);

const getPopularRadios = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "",
      data: popularRadios,
    });
  }
);

const getFeaturedCharts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "",
      data: featuredCharts,
    });
  }
);

export {
  getPopularArtists,
  getPopularAlbums,
  getPopularRadios,
  getFeaturedCharts,
};
