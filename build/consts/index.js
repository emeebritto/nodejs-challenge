"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listName = void 0;
const config_1 = __importDefault(require("config"));
const utils_1 = require("../utils");
exports.listName = (0, utils_1.formatListName)(config_1.default.get("list.name"));
// export const isDevEnv = process.env.NODE_ENV === 'development';
