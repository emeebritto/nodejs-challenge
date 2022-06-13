"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsFactory = void 0;
const hubspot_1 = __importDefault(require("../services/hubspot"));
const utils_1 = require("../utils");
class Contacts {
    constructor(listID, contacts) {
        this.listID = listID;
        this.contacts = contacts || [];
    }
    async add(ctt) {
        return hubspot_1.default.lists.addContacts(this.listID, { vids: [ctt.vid] })
            .then((res) => {
            this.contacts.push(ctt);
            console.log(`Contacts -> ${ctt.email} has been added`);
            return res;
        });
    }
    get domains() {
        const domains = [];
        const domainNames = (0, utils_1.mergeValues)(this.contacts.map(ctt => ctt.email.split('@')[1]));
        domainNames.forEach(domain => {
            const quantity = (0, utils_1.count)(this.contacts, (contact) => {
                return contact.email.includes(domain);
            });
            domains.push({ domain, quantity });
        });
        return domains;
    }
    get show() {
        return this.contacts;
    }
    get length() {
        return this.contacts.length;
    }
}
class ContactsFactory {
    static async load(listId) {
        const contacts = [];
        let vidOffset = 0;
        let hasMore = false;
        do {
            let data = await hubspot_1.default.apiRequest({
                method: 'GET',
                path: `/contacts/v1/lists/${listId}/contacts/all`,
                qs: { vidOffset },
                qsStringifyOptions: { indices: false },
            });
            for (let i = 0; i < data.contacts.length; i++) {
                let ctt = data.contacts[i];
                contacts.push({
                    vid: ctt.vid,
                    firstname: ctt.properties.firstname.value,
                    lastname: ctt.properties.lastname.value,
                    email: ctt['identity-profiles'][0].identities[0].value
                });
            }
            vidOffset = data['vid-offset'];
            hasMore = data['has-more'];
        } while (hasMore);
        return new Contacts(listId, contacts);
    }
    static async create(configs) {
        const { listId } = await hubspot_1.default.lists.create(configs);
        console.log(`ContactsFactory -> list (id: ${listId}, name: ${configs.name}) was created`);
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
