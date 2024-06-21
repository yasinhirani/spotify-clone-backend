"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YBlEH7KFuHj04V",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "s4Y66DzDyEg2QxpbbzScIfOu",
});
exports.default = razorpay;
