import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import query from "../../utils/queryExecuter";
import ApiResponse from "../../utils/apiResponse";
import ApiError from "../../utils/apiError";

const getAllPlaylists = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const playlists = await query(`SELECT * FROM playlists`);

    res.status(200).json(new ApiResponse({ playlists }));
  }
);

const getPlaylistByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const playlists = await query(
      `SELECT * FROM playlists WHERE user_id = ${id}`
    );

    res.status(200).json(
      new ApiResponse({
        playlists: playlists
          ? Array.isArray(playlists)
            ? playlists
            : [playlists]
          : [],
      })
    );
  }
);

const getPlaylistDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const playlistQuery = await query(`SELECT playlists.*, 
ARRAY_AGG(json_build_object('id', songs.id, 'name', songs.name, 'duration_ms', songs.duration_ms, 'album', songs.album, 'artists', songs.artists, 'preview_url', songs.preview_url)) AS tracks 
FROM playlists 
LEFT JOIN songs ON playlists.id = songs.playlist_id 
WHERE playlists.id = ${id} 
GROUP BY playlists.id;`);

    const playlist = {
      ...playlistQuery,
      tracks: {
        items: playlistQuery.tracks[0].id
          ? playlistQuery.tracks.map((track: any) => {
              return { track };
            })
          : [],
      },
    };

    res.status(200).json(new ApiResponse({ playlist }));
  }
);

const createPlaylist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await query(
      `INSERT INTO playlists (name, type, description, user_id) VALUES ('${req.body.name}', 'playlist', '${req.body.description}', '${req.body.userId}')`
    );

    res
      .status(201)
      .json(new ApiResponse(null, "Playlist created successfully"));
  }
);

const addSongToPlaylist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const song = await query(
      `SELECT * FROM songs WHERE id = '${req.body.id}' AND playlist_id = ${id}`
    );

    if (!song) {
      const artists = req.body.artists.map((artist: any) =>
        JSON.stringify(artist)
      );

      await query(
        `INSERT INTO songs (id, name, duration_ms, album, artists, preview_url, playlist_id) VALUES ($1, $2, $3, $4, $5::jsonb[], $6, $7)`,
        [
          req.body.id,
          req.body.name,
          req.body.duration_ms,
          req.body.album,
          artists,
          req.body.preview_url,
          id,
        ]
      );

      res
        .status(201)
        .json(new ApiResponse(null, "Song added to playlist successfully"));
    } else {
      throw new ApiError("Song is already in the selected Playlist", 400);
    }
  }
);

const deleteSongFromPlaylist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const song = await query(`SELECT * FROM songs WHERE id = '${id}'`);

    if (song) {
      await query(`DELETE FROM songs WHERE id = '${id}'`);

      res.sendStatus(204);
    } else {
      throw new ApiError("Song is not available in the playlist", 404);
    }
  }
);

export {
  getAllPlaylists,
  getPlaylistByUserId,
  getPlaylistDetail,
  createPlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist
};
