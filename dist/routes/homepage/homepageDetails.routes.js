"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepageDetails_1 = require("../../controllers/homepage/homepageDetails/homepageDetails");
const router = express_1.default.Router();
router.route("/artists").get(homepageDetails_1.getPopularArtists);
router.route("/albums").get(homepageDetails_1.getPopularAlbums);
router.route("/radios").get(homepageDetails_1.getPopularRadios);
router.route("/charts").get(homepageDetails_1.getFeaturedCharts);
exports.default = router;
