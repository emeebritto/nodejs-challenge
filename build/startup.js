"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const config_1 = __importDefault(require("config"));
const hubspot_1 = __importDefault(require("./services/hubspot"));
const csv_1 = __importDefault(require("./utils/csv"));
const consts_1 = require("./consts");
const contact_1 = require("./entities/contact");
const contacts_1 = require("./entities/contacts");
require("./polyfill");
// CREATE INITIAL LIST "emerson.britto.[timestamp]"
(async () => {
    try {
        if (config_1.default.get('onStartup.destroyAllList'))
            await contacts_1.ContactsFactory.destroyAll();
        const dataPath = node_path_1.default.join(__dirname, './data/contatos.csv');
        const csvObj = await csv_1.default.loadCSV(dataPath);
        const timestamp = new Date().getTime();
        const hubspotlistName = `${consts_1.listName}.${timestamp}`;
        const result = await hubspot_1.default.lists.get();
        console.log(`Statup -> ${result.lists.length} list was founded`);
        const listEvenExists = result.lists.some((list) => list.name.includes(consts_1.listName));
        if (!listEvenExists) {
            const contacts = await contacts_1.ContactsFactory.create({ name: hubspotlistName });
            console.log('registering initial data to list...');
            for (let i = 0; i < csvObj.length; i++) {
                const contact = await contact_1.ContactFactory.create(csvObj[i], { loadIfExists: true });
                contacts.add(contact);
            }
            ;
            console.log('initial data registered successfully');
        }
    }
    catch (err) {
        console.log(err);
    }
})();
