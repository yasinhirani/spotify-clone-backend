"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("../../controllers/search/search.controller");
const router = express_1.default.Router();
router.route("/").get(search_controller_1.search);
router.route("/song").get(search_controller_1.searchSong);
router.route("/song/alternate").get(search_controller_1.getAlternateUrl);
exports.default = router;
