"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsFactory = void 0;
const hubspot_1 = __importDefault(require("../services/hubspot"));
class Contacts {
    constructor(listID) {
        this.listID = listID;
        this.contacts = [];
    }
    async add(ctt) {
        return hubspot_1.default.lists.addContacts(this.listID, { vids: [ctt.vid] })
            .then((res) => {
            this.contacts.push(ctt);
            console.log(`Contacts -> ${ctt.email} has been added`);
            return res;
        });
    }
    get show() {
        return this.contacts;
    }
    get length() {
        return this.contacts.length;
    }
}
class ContactsFactory {
    static load(listId) {
        return new Contacts(listId);
    }
    static async create(configs) {
        const { listId } = await hubspot_1.default.lists.create(configs);
        console.log(`ContactsFactory -> list (name: ${configs.name}) was created`);
        return new Contacts(listId);
    }
    static async destroyAll() {
        const { lists } = await hubspot_1.default.lists.get();
        console.log(`ContactsFactory -> ${lists.length} will be destroyed`);
        for (let i = 0; i < lists.length; i++) {
            let listId = lists[i].listId;
            await hubspot_1.default.lists.delete(listId);
        }
    }
}
exports.ContactsFactory = ContactsFactory;
