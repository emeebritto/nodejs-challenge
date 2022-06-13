import hubspot from "../services/hubspot";
import { ContactFromDB, ContactProps } from "../common/interfaces";

class Contact {
	public vid:number;
	public firstname:string;
	public lastname:string;
	public email:string;
	public gender:string;
	constructor({ vid, firstname, lastname, email,  gender }:ContactFromDB) {
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
	static async create(ctt:ContactProps, opts?:{ loadIfExists:boolean }): Promise<Contact> {
		const newContact = {} as { [key:string]: string };
		Object.entries(ctt).forEach(([property, value]) => {
			newContact[property.replaceAll("_", "")] = value;
		});

		try {
	 		const ctt = await hubspot.contacts.create({ properties: newContact });
	 		return new Contact({ vid: ctt.vid, ...ctt.properties });
		} catch (err) {
			if (!opts?.loadIfExists) throw err;
			let contactEmail = newContact.email;
			return this.load(contactEmail);
		}
	}

	static async load(contactEmail:string) {
		const ctt = await hubspot.contacts.getByEmail(String(contactEmail));
		return new Contact({ vid: ctt.vid, ...ctt.properties });
	}
}

export default Contact;
export { ContactFactory };
