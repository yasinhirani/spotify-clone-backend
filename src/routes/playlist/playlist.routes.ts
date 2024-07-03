import express from "express";
import { getPlaylist } from "../../controllers/playlist/playlist.controller";

const router = express.Router();

router.route("/:id").get(getPlaylist);

export default router;
