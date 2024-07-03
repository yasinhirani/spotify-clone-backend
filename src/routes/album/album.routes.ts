import express from "express";
import { getAlbum } from "../../controllers/album/album.controller";

const router = express.Router();

router.route("/:id").get(getAlbum);

export default router;
