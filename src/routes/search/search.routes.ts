import express from "express";
import { getAlternateUrl, search, searchSong } from "../../controllers/search/search.controller";

const router = express.Router();

router.route("/").get(search);
router.route("/song").get(searchSong);
router.route("/song/alternate").get(getAlternateUrl);

export default router;
