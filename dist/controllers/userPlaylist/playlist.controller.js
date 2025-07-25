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
exports.deleteSongFromPlaylist = exports.addSongToPlaylist = exports.createPlaylist = exports.getPlaylistDetail = exports.getPlaylistByUserId = exports.getAllPlaylists = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const queryExecuter_1 = __importDefault(require("../../utils/queryExecuter"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const apiError_1 = __importDefault(require("../../utils/apiError"));
const getAllPlaylists = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield (0, queryExecuter_1.default)(`SELECT * FROM playlists`);
    res.status(200).json(new apiResponse_1.default({ playlists }));
}));
exports.getAllPlaylists = getAllPlaylists;
const getPlaylistByUserId = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id !== req.user.userId.toString().toString()) {
        throw new apiError_1.default("You cannot view someone else playlist", 403);
    }
    const playlists = yield (0, queryExecuter_1.default)(`SELECT * FROM playlists WHERE user_id = ${id}`);
    res.status(200).json(new apiResponse_1.default({
        playlists: playlists
            ? Array.isArray(playlists)
                ? playlists
                : [playlists]
            : [],
    }));
}));
exports.getPlaylistByUserId = getPlaylistByUserId;
const getPlaylistDetail = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const playlistQuery = yield (0, queryExecuter_1.default)(`SELECT playlists.*, 
ARRAY_AGG(json_build_object('id', songs.id, 'name', songs.name, 'duration_ms', songs.duration_ms, 'album', songs.album, 'artists', songs.artists, 'preview_url', songs.preview_url)) AS tracks 
FROM playlists 
LEFT JOIN songs ON playlists.id = songs.playlist_id 
WHERE playlists.id = ${id} 
GROUP BY playlists.id;`);
    if (playlistQuery.user_id.toString() !== req.user.userId.toString()) {
        throw new apiError_1.default("You cannot view someone else playlist", 403);
    }
    const playlist = Object.assign(Object.assign({}, playlistQuery), { tracks: {
            items: playlistQuery.tracks[0].id
                ? playlistQuery.tracks.map((track) => {
                    return { track };
                })
                : [],
        } });
    res.status(200).json(new apiResponse_1.default({ playlist }));
}));
exports.getPlaylistDetail = getPlaylistDetail;
const createPlaylist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.userId.toString() !== req.user.userId.toString()) {
        throw new apiError_1.default("You can create playlist for yourself only", 403);
    }
    yield (0, queryExecuter_1.default)(`INSERT INTO playlists (name, type, description, user_id) VALUES ('${req.body.name}', 'playlist', '${req.body.description}', '${req.body.userId}')`);
    res
        .status(201)
        .json(new apiResponse_1.default(null, "Playlist created successfully"));
}));
exports.createPlaylist = createPlaylist;
const addSongToPlaylist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const song = yield (0, queryExecuter_1.default)(`SELECT * FROM songs WHERE id = '${req.body.id}' AND playlist_id = ${id}`);
    if (!song) {
        const playlist = yield (0, queryExecuter_1.default)(`SELECT * FROM playlists WHERE id = ${id}`);
        if (!playlist) {
            throw new apiError_1.default("Playlist is not available", 404);
        }
        if (playlist.user_id.toString() !== req.user.userId.toString()) {
            throw new apiError_1.default("You cannot add song in someone else playlist", 403);
        }
        const artists = req.body.artists.map((artist) => JSON.stringify(artist));
        yield (0, queryExecuter_1.default)(`INSERT INTO songs (id, name, duration_ms, album, artists, preview_url, playlist_id) VALUES ($1, $2, $3, $4, $5::jsonb[], $6, $7)`, [
            req.body.id,
            req.body.name,
            req.body.duration_ms,
            req.body.album,
            artists,
            req.body.preview_url,
            id,
        ]);
        res
            .status(201)
            .json(new apiResponse_1.default(null, "Song added to playlist successfully"));
    }
    else {
        throw new apiError_1.default("Song is already in the selected Playlist", 400);
    }
}));
exports.addSongToPlaylist = addSongToPlaylist;
const deleteSongFromPlaylist = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const song = yield (0, queryExecuter_1.default)(`SELECT s.id AS song_id, p.user_id as user_id FROM songs s LEFT JOIN playlists p ON p.id = s.playlist_id WHERE s.id = '${id}' AND p.user_id = ${req.user.userId};`);
    if (song) {
        if (song.user_id.toString() !== req.user.userId.toString()) {
            throw new apiError_1.default("You cannot delete song someone else playlist", 403);
        }
        yield (0, queryExecuter_1.default)(`DELETE FROM songs WHERE id = '${id}'`);
        res.sendStatus(204);
    }
    else {
        throw new apiError_1.default("Song is not available in the playlist", 404);
    }
}));
exports.deleteSongFromPlaylist = deleteSongFromPlaylist;
