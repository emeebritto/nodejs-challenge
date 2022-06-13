"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hubspot_1 = __importDefault(require("../services/hubspot"));
const contacts_1 = require("../entities/contacts");
class ContactsController {
    async contacts(req, res) {
        const { lists } = await hubspot_1.default.lists.get();
        const { listId } = lists.find((list) => list.name.includes("emerson.britto"));
        const contacts = await contacts_1.ContactsFactory.load(listId);
        return res.json({
            response: contacts
        });
    }
    async domains(req, res) {
        const { lists } = await hubspot_1.default.lists.get();
        const { listId } = lists.find((list) => list.name.includes("emerson.britto"));
        const contacts = await contacts_1.ContactsFactory.load(listId);
        return res.json({
            response: contacts.domains
        });
    }
}
const contactsController = new ContactsController();
exports.default = contactsController;
