"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
dotenv_1.default.config({
    path: "./.env",
});
const PORT = process.env.PORT;
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error.message);
    process.exit(1);
});
