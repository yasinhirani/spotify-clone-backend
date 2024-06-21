"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getHomepageData_1 = require("../../controllers/homepage/getHomepageData");
const router = express_1.default.Router();
router.route("/").get(getHomepageData_1.getHomepageData);
exports.default = router;
