"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
dotenv_1.default.config();
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.port = process.env.port || 3000;
        this.middleware();
        this.router();
    }
    middleware() {
        this.server.use(express_1.default.json());
    }
    router() {
        this.server.use(router_1.router);
    }
    startup(callback) {
        this.server.listen(this.port, () => {
            if (callback)
                callback();
        });
    }
}
exports.App = App;
