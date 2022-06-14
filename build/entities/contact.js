"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactFactory = void 0;
const hubspot_1 = __importDefault(require("../services/hubspot"));
class Contact {
    constructor({ vid, firstname, lastname, email, gender }) {
        this.vid = vid;
        this.firstname = firstname.value;
        this.lastname = lastname.value;
        this.email = email.value;
        this.gender = gender.value;
    }
    get properties() {
        return {
            vid: this.vid,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            gender: this.gender
        };
    }
}
class ContactFactory {
    static async create(ctt, opts) {
        const newContact = {};
        Object.entries(ctt).forEach(([property, value]) => {
            newContact[property.replaceAll("_", "")] = value;
        });
        try {
            const ctt = await hubspot_1.default.contacts.create({ properties: newContact });
            return new Contact({ vid: ctt.vid, ...ctt.properties });
        }
        catch (err) {
            if (!opts?.loadIfExists)
                throw err;
            let contactEmail = newContact.email;
            return this.load(contactEmail);
        }
    }
    static async load(contactEmail) {
        const ctt = await hubspot_1.default.contacts.getByEmail(String(contactEmail));
        return new Contact({ vid: ctt.vid, ...ctt.properties });
    }
    static async loadById(contactVid) {
        const ctt = await hubspot_1.default.contacts.getById(String(contactVid));
        return new Contact({ vid: ctt.vid, ...ctt.properties });
    }
}
exports.ContactFactory = ContactFactory;
exports.default = Contact;
