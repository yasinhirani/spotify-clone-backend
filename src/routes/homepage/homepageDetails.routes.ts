import express from "express";
import {
  getFeaturedCharts,
  getPopularAlbums,
  getPopularArtists,
  getPopularRadios,
} from "../../controllers/homepage/homepageDetails/homepageDetails";

const router = express.Router();

router.route("/artists").get(getPopularArtists);
router.route("/albums").get(getPopularAlbums);
router.route("/radios").get(getPopularRadios);
router.route("/charts").get(getFeaturedCharts);

export default router;
