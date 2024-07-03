"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const startupQuery_1 = __importDefault(require("./utils/startupQuery"));
dotenv_1.default.config({
    path: "./.env",
});
const PORT = process.env.PORT;
(0, startupQuery_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
