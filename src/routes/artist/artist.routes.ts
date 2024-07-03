import express from "express";
import { getArtist, getArtistTopTracks } from "../../controllers/artist/artist.controller";

const router = express.Router();

router.route("/:id").get(getArtist);
router.route("/:id/top-tracks").get(getArtistTopTracks);

export default router;
