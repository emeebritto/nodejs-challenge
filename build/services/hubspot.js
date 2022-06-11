"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hubspot_1 = __importDefault(require("hubspot"));
var hubspot = new hubspot_1.default({
    apiKey: process.env.HUBSPOT_API_KEY || ""
});
exports.default = hubspot;
