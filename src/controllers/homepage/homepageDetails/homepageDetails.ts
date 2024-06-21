import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import fs from "fs";

const getPopularArtists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const popularArtists = await fs.promises.readFile(
      "src/json/popularArtists.json",
      { encoding: "utf-8" }
    );
    res.status(200).json({
      success: true,
      message: "",
      data: JSON.parse(popularArtists),
    });
  }
);

const getPopularAlbums = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const popularAlbums = await fs.promises.readFile(
      "src/json/popularAlbums.json",
      { encoding: "utf-8" }
    );
    res.status(200).json({
      success: true,
      message: "",
      data: JSON.parse(popularAlbums),
    });
  }
);

const getPopularRadios = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const popularRadios = await fs.promises.readFile(
      "src/json/popularRadios.json",
      { encoding: "utf-8" }
    );
    res.status(200).json({
      success: true,
      message: "",
      data: JSON.parse(popularRadios),
    });
  }
);

const getFeaturedCharts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const featuredCharts = await fs.promises.readFile(
      "src/json/featuredCharts.json",
      { encoding: "utf-8" }
    );
    res.status(200).json({
      success: true,
      message: "",
      data: JSON.parse(featuredCharts),
    });
  }
);

export {
  getPopularArtists,
  getPopularAlbums,
  getPopularRadios,
  getFeaturedCharts,
};
