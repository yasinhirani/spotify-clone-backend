"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpay_1 = require("../../controllers/razorpay/razorpay");
const router = express_1.default.Router();
router.route("/").get(razorpay_1.createSubscription);
exports.default = router;
