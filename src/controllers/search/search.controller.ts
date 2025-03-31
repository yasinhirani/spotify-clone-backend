import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import axiosInstance from "../../utils/axiosInstance";
import ApiResponse from "../../utils/apiResponse";
import axios from "axios";
import { createDownloadLinks } from "../../utils/createDownloadURL";
import { getAlternateAudioUrl } from "../../utils/getAlternateAudioUrl";

const search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;

    const response = await axiosInstance.get(
      `/v1/search?q=${query}&type=album,track,artist,playlist&limit=10&offset=0`
    );

    res.status(200).json(new ApiResponse({ result: response.data }));
  }
);

const searchSong = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;

    const response = await fetch(`${process.env.GET_SONG_URL}/api/search/songs?query=${query}&page=0&limit=10`);

    const data = await response.json();

    const songsData: any = data.data.results.map((songData: any) => {
      return {
        downloadUrl: songData?.downloadUrl ?? [],
        artists: {
          primary: songData?.artists?.primary ?? []
        }
      }
    });

    res.status(200).json(new ApiResponse({ results: songsData }));
  }
);


const getAlternateUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {songName, artistName} = req.query;

  const alternateUrl = await getAlternateAudioUrl(songName as string, artistName as string);

  res.status(200).json(new ApiResponse({url: alternateUrl}))
})

export { search, searchSong, getAlternateUrl };
