"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const hubspot_1 = __importDefault(require("./services/hubspot"));
const csv_1 = __importDefault(require("./utils/csv"));
const contact_1 = require("./entities/contact");
const contacts_1 = require("./entities/contacts");
require("./polyfill");
// CREATE INITIAL LIST "emerson.britto.[timestamp]"
(async () => {
    try {
        // await ContactsFactory.destroyAll();
        const dataPath = node_path_1.default.join(__dirname, './data/contatos.csv');
        const csvObj = await csv_1.default.loadCSV(dataPath);
        const timestamp = new Date().getTime();
        const candidateName = "emerson.britto";
        const listName = `${candidateName}.${timestamp}`;
        const result = await hubspot_1.default.lists.get();
        console.log(`Statup -> ${result.lists.length} list was founded`);
        const listEvenExists = result.lists.some((list) => list.name.includes(candidateName));
        if (!listEvenExists) {
            const contacts = await contacts_1.ContactsFactory.create({ name: listName });
            console.log('registering initial data to list...');
            for (let i = 0; i < csvObj.length; i++) {
                const contact = await contact_1.ContactFactory.create(csvObj[i], { loadIfExists: true });
                contacts.add(contact);
            }
            ;
            console.log('initial data registered successfully');
        }
    }
    catch ({ error }) {
        console.log(error);
    }
})();
