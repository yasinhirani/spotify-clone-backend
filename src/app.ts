import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import homepageRouter from "./routes/homepage/homepage.routes";
import homepageDetailRouter from "./routes/homepage/homepageDetails.routes";
import userRouter from "./routes/user/user.routes";
import userPlaylistRouter from "./routes/userPlaylist/userPlaylist.routes";
import artistRouter from "./routes/artist/artist.routes";
import albumRouter from "./routes/album/album.routes";
import playlistRouter from "./routes/playlist/playlist.routes";
import searchRouter from "./routes/search/search.routes";
import razorpayRouter from "./routes/razorpay/razorpay.routes";
import errorHandler from "./utils/errorHandler";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/homepage", homepageRouter);
app.use("/api/homepage/detail", homepageDetailRouter);
app.use("/api/user", userRouter);
app.use("/api/user-playlist", userPlaylistRouter);
app.use("/api/artist", artistRouter);
app.use("/api/album", albumRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/search", searchRouter);
app.use("/api/create-subscription", razorpayRouter);

app.all("*", (req: Request, res: Response, next:NextFunction) => {
  next(new Error(`Could not ${req.method} ${req.path}`));
});

app.use(errorHandler);

export default app;
