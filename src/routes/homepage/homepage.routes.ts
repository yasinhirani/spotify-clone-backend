import express from "express";
import { getHomepageData } from "../../controllers/homepage/getHomepageData";

const router = express.Router();

router.route("/").get(getHomepageData);

export default router;
