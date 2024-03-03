"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = require("./src/middlewares/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(logger_1.logger);
exports.default = app;
