import express from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  deleteSongFromPlaylist,
  getAllPlaylists,
  getPlaylistByUserId,
  getPlaylistDetail,
} from "../../controllers/userPlaylist/playlist.controller";

const router = express.Router();

router.route("/").get(getAllPlaylists);
router.route("/:id").get(getPlaylistByUserId);
router.route("/:id/detail").get(getPlaylistDetail);
router.route("/create").post(createPlaylist);
router.route("/:id/addSongs").post(addSongToPlaylist);
router.route("/:id/deleteSong").delete(deleteSongFromPlaylist);

export default router;
