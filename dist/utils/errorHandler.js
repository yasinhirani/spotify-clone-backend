"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError"));
const handleJwtTokenError = () => {
    return new apiError_1.default("Provided token is invalid.", 401);
};
const handleJwtExpireError = () => {
    return new apiError_1.default("Verification link has expired, try with the new link", 400);
};
const errorResponseDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message,
        data: null,
    });
};
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = Object.defineProperties({}, Object.getOwnPropertyDescriptors(err));
    if (err.name === "JsonWebTokenError")
        error = handleJwtTokenError();
    if (err.name === "TokenExpiredError") {
        res.send("Verification link has expired, try with the new link");
        return;
    }
    ;
    errorResponseDev(error, res);
};
exports.default = errorHandler;
