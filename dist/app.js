"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const homepage_routes_1 = __importDefault(require("./routes/homepage/homepage.routes"));
const homepageDetails_routes_1 = __importDefault(require("./routes/homepage/homepageDetails.routes"));
const user_routes_1 = __importDefault(require("./routes/user/user.routes"));
const userPlaylist_routes_1 = __importDefault(require("./routes/userPlaylist/userPlaylist.routes"));
const artist_routes_1 = __importDefault(require("./routes/artist/artist.routes"));
const album_routes_1 = __importDefault(require("./routes/album/album.routes"));
const playlist_routes_1 = __importDefault(require("./routes/playlist/playlist.routes"));
const search_routes_1 = __importDefault(require("./routes/search/search.routes"));
const razorpay_routes_1 = __importDefault(require("./routes/razorpay/razorpay.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/homepage", homepage_routes_1.default);
app.use("/api/homepage/detail", homepageDetails_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/user-playlist", userPlaylist_routes_1.default);
app.use("/api/artist", artist_routes_1.default);
app.use("/api/album", album_routes_1.default);
app.use("/api/playlist", playlist_routes_1.default);
app.use("/api/search", search_routes_1.default);
app.use("/api/create-subscription", razorpay_routes_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `Could not ${req.method} ${req.path}`,
        data: null,
    });
});
exports.default = app;
