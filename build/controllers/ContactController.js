"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hubspot_1 = __importDefault(require("../services/hubspot"));
const consts_1 = require("../consts");
const contacts_1 = require("../entities/contacts");
class ContactsController {
    async getContacts() {
        const { lists } = await hubspot_1.default.lists.get();
        const { listId } = lists.find((list) => list.name.includes(consts_1.listName));
        const contacts = await contacts_1.ContactsFactory.load(listId);
        return contacts;
    }
    async contacts(req, res) {
        try {
            const contacts = await this.getContacts();
            return res.json({ response: contacts });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, msg: "Internal Service Error" });
        }
    }
    async domains(req, res) {
        try {
            const contacts = await this.getContacts();
            return res.json({ response: contacts.domains });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, msg: "Internal Service Error" });
        }
    }
}
const contactsController = new ContactsController();
exports.default = contactsController;
