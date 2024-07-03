import express from "express";
import { getFeaturedPlaylists, getPlaylist } from "../../controllers/playlist/playlist.controller";

const router = express.Router();

router.route("/featured-playlists").get(getFeaturedPlaylists);
router.route("/:id").get(getPlaylist);

export default router;
