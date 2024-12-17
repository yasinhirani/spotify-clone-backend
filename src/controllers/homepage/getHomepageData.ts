import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import axiosInstance from "../../utils/axiosInstance";
import homepageData from "../../data/homepageData";

const getHomepageData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await axiosInstance.get(
      `/v1/search?q=bollywood&type=playlist&limit=10&offset=0`
    );

    const updatedResponse = [
      {
        id: 5,
        title: "Popular Playlists",
        type: "playlist",
        contents: {
          items: response.data.playlists.items
            .filter((item: any) => item)
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              type: item.type,
              images: item.images,
              description: item.description
            })),
        },
      },
      ...homepageData.items,
    ];

    res.status(200).json(new ApiResponse(updatedResponse));
  }
);

export { getHomepageData };
