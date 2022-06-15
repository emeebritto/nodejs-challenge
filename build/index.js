"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./env.config");
const app_1 = require("./app");
require("./startup");
new app_1.App().startup((port) => {
    console.log(`Server is running on port ${port}`);
});
