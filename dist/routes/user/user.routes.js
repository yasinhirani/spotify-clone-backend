"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/user/user.controller");
const router = express_1.default.Router();
router.route("/login").post(user_controller_1.login);
router.route("/signup").post(user_controller_1.signup);
router.route("/sendVerificationEmail").post(user_controller_1.sendVerificationEmail);
router.route("/verifyEmail").get(user_controller_1.verifyEmail);
exports.default = router;
