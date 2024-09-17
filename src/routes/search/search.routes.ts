import express from "express";
import { search, searchSong } from "../../controllers/search/search.controller";

const router = express.Router();

router.route("/").get(search);
router.route("/song").get(searchSong);

export default router;
