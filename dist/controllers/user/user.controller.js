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
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJwt_1 = require("../../utils/generateJwt");
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queryExecuter_1 = __importDefault(require("../../utils/queryExecuter"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const apiError_1 = __importDefault(require("../../utils/apiError"));
const login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, queryExecuter_1.default)(`SELECT * FROM users WHERE email = '${req.body.email}'`);
    if (user) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (isPasswordCorrect) {
            if (!user.email_verified) {
                const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${(0, generateJwt_1.generateJsonWebToken)(user.email)}`;
                yield (0, sendMail_1.default)(user.email, link);
            }
            res.status(200).json(new apiResponse_1.default({
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.email_verified,
                access_token: (0, generateJwt_1.generateJsonWebToken)(user.email, user.id),
            }, "Login successfully"));
        }
        else {
            throw new apiError_1.default("Email or password is incorrect", 401);
        }
    }
    else {
        throw new apiError_1.default("Email address does not exist", 404);
    }
}));
exports.login = login;
const signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, queryExecuter_1.default)(`SELECT * FROM users WHERE email = '${req.body.email}'`);
    if (user) {
        throw new apiError_1.default("User with same email address already exist", 400);
    }
    else {
        const encryptedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
        yield (0, queryExecuter_1.default)(`INSERT INTO users (name, email, password, email_verified) VALUES ('${req.body.name}', '${req.body.email}', '${encryptedPassword}', ${false})`);
        const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${(0, generateJwt_1.generateJsonWebTokenEmail)(req.body.email)}`;
        yield (0, sendMail_1.default)(req.body.email, link);
        res.status(201).json(new apiResponse_1.default(null, "Signup successful"));
    }
}));
exports.signup = signup;
const sendVerificationEmail = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, queryExecuter_1.default)(`SELECT * FROM users WHERE email = '${req.body.email}'`);
    if (user) {
        const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${(0, generateJwt_1.generateJsonWebTokenEmail)(req.body.email)}`;
        yield (0, sendMail_1.default)(req.body.email, link);
        res.status(200).json(new apiResponse_1.default(null, "Email send successfully"));
    }
    else {
        throw new apiError_1.default("User is not available, Make sure you have signed up first", 404);
    }
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
            const userToUpdate = yield (0, queryExecuter_1.default)(`SELECT * FROM users WHERE email = '${user.email}'`);
            if (userToUpdate) {
                if (userToUpdate.email_verified) {
                    res.send("Email is already verified");
                }
                else {
                    yield (0, queryExecuter_1.default)(`UPDATE users SET email_verified=${true} WHERE email = '${user.email}'`);
                    res.setHeader("Content-Type", "text/html");
                    res.send("<p>Email verified successfully, <a href='https://tunetide.vercel.app/login'>Login to your account</a></p>");
                }
            }
            else {
                res.send("User is not available");
            }
        }
    }
}));
exports.verifyEmail = verifyEmail;
