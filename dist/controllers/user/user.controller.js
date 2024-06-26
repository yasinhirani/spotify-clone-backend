"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.verifyEmail = exports.signup = exports.login = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const user_model_1 = require("../../model/user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJwt_1 = __importDefault(require("../../utils/generateJwt"));
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (isPasswordCorrect) {
            if (!user.emailVerified) {
                const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${(0, generateJwt_1.default)(user.email)}`;
                yield (0, sendMail_1.default)(user.email, link);
            }
            res.status(200).json({
                success: true,
                message: "Login successfully",
                data: {
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    access_token: (0, generateJwt_1.default)(user.email),
                },
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: "Email or password is incorrect",
                data: null,
            });
        }
    }
    else {
        res.status(404).json({
            success: false,
            message: "Email address does not exist",
            data: null,
        });
    }
}));
exports.login = login;
const signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: req.body.email });
    if (user) {
        res.status(400).json({
            success: false,
            message: "User with same email address already exist",
            data: null,
        });
    }
    else {
        const userBody = Object.assign(Object.assign({}, req.body), { emailVerified: false });
        yield user_model_1.User.create(userBody);
        const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${(0, generateJwt_1.default)(req.body.email)}`;
        yield (0, sendMail_1.default)(req.body.email, link);
        res.status(201).json({
            success: true,
            message: "Signup successful",
            data: null,
        });
    }
}));
exports.signup = signup;
const sendVerificationEmail = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const link = `http://localhost:8080/api/user/verifyEmail?token=${(0, generateJwt_1.default)(req.body.email)}`;
    yield (0, sendMail_1.default)(req.body.email, link);
    res.status(200).json({
        success: true,
        message: "Email send successfully",
        data: null,
    });
}));
exports.sendVerificationEmail = sendVerificationEmail;
const verifyEmail = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const verifyToken = token;
    if (!verifyToken) {
        res.send("There was an issue reading the token, please try again with a new link");
    }
    else {
        const user = jsonwebtoken_1.default.verify(verifyToken, process.env.ACCESS_TOKEN_SECRET);
        if (user) {
            const userToUpdate = yield user_model_1.User.findOne({ email: user.email });
            if (userToUpdate) {
                if (userToUpdate.emailVerified) {
                    res.send("Email is already verified");
                }
                else {
                    yield user_model_1.User.updateOne({ email: user.email }, { emailVerified: true });
                    res.send("Email verified successfully");
                }
            }
            else {
                res.send("User is not available");
            }
        }
    }
}));
exports.verifyEmail = verifyEmail;
