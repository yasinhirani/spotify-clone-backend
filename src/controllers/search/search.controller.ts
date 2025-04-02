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

    const response = await axios.get(
      `${process.env.GET_SONG_URL}?p=1&q=${query}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults`
    );
  
    const songsData = response.data.results.map((result: any) => ({
      artists: {
        primary: result?.more_info?.artistMap?.primary_artists
      },
      downloadUrl: createDownloadLinks(result?.more_info?.encrypted_media_url)
    }))

    res.status(200).json(new ApiResponse({ results: songsData }));
  }
);


const getAlternateUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {songName, artistName} = req.query;

  const alternateUrl = await getAlternateAudioUrl(songName as string, artistName as string);

  res.status(200).json(new ApiResponse({url: alternateUrl}))
})

export { search, searchSong, getAlternateUrl };
