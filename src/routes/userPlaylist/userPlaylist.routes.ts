import express from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  deleteSongFromPlaylist,
  getAllPlaylists,
  getPlaylistByUserId,
  getPlaylistDetail,
} from "../../controllers/userPlaylist/playlist.controller";
import { validateToken } from "../../utils/validateToken";

const router = express.Router();

// router.route("/").get(getAllPlaylists);
router.route("/:id").get(validateToken, getPlaylistByUserId);
router.route("/:id/detail").get(validateToken, getPlaylistDetail);
router.route("/create").post(validateToken, createPlaylist);
router.route("/:id/addSongs").post(validateToken, addSongToPlaylist);
router.route("/:id/deleteSong").delete(validateToken, deleteSongFromPlaylist);

export default router;
