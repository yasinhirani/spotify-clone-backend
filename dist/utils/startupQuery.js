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
const queryExecuter_1 = __importDefault(require("./queryExecuter"));
const runStartupQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, queryExecuter_1.default)(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100),
            email_verified BOOLEAN,
            password VARCHAR(100)
        );
        
        CREATE TABLE IF NOT EXISTS playlists(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            type VARCHAR(20),
            description VARCHAR(500),
            user_id INT,
            FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS songs(
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(200),
            duration_ms BIGSERIAL,
            album JSONB,
            artists JSONB ARRAY,
            preview_url VARCHAR(200),
            playlist_id INT,
            FOREIGN KEY (playlist_id)
            REFERENCES playlists (id)
            ON DELETE CASCADE
        );
    `);
});
exports.default = runStartupQuery;
