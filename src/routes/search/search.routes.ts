import express from "express";
import { search } from "../../controllers/search/search.controller";

const router = express.Router();

router.route("/").get(search);

export default router;
