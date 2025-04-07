"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlist_controller_1 = require("../../controllers/userPlaylist/playlist.controller");
const validateToken_1 = require("../../utils/validateToken");
const router = express_1.default.Router();
// router.route("/").get(getAllPlaylists);
router.route("/:id").get(validateToken_1.validateToken, playlist_controller_1.getPlaylistByUserId);
router.route("/:id/detail").get(validateToken_1.validateToken, playlist_controller_1.getPlaylistDetail);
router.route("/create").post(validateToken_1.validateToken, playlist_controller_1.createPlaylist);
router.route("/:id/addSongs").post(validateToken_1.validateToken, playlist_controller_1.addSongToPlaylist);
router.route("/:id/deleteSong").delete(validateToken_1.validateToken, playlist_controller_1.deleteSongFromPlaylist);
exports.default = router;
