"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ContactController_1 = __importDefault(require("./controllers/ContactController"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    res.json({
        creator: "Emerson-Britto",
        try: [
            "/contacts [GET]",
            "/contacts/domains [GET]"
        ]
    });
});
//Routes
router
    .route("/contacts")
    .get(ContactController_1.default.contacts.bind(ContactController_1.default));
router
    .route("/contacts/domains")
    .get(ContactController_1.default.domains.bind(ContactController_1.default));
