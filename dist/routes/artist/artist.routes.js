"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artist_controller_1 = require("../../controllers/artist/artist.controller");
const router = express_1.default.Router();
router.route("/:id").get(artist_controller_1.getArtist);
router.route("/:id/top-tracks").get(artist_controller_1.getArtistTopTracks);
exports.default = router;
