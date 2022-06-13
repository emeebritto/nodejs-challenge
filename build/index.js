"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("./startup");
new app_1.App().startup(() => {
    console.log('Server is running on port 3000');
});
