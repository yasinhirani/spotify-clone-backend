import express from "express";
import { signup, login, verifyEmail, sendVerificationEmail } from "../../controllers/user/user.controller";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/sendVerificationEmail").post(sendVerificationEmail);
router.route("/verifyEmail").get(verifyEmail);

export default router;
