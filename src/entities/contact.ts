import hubspot from "../services/hubspot";

class ContactModel {
	private ctt:any;
	constructor(ctt:any) {
		this.ctt = ctt;
	}

	get properties() {
		return this.ctt;
	}
}

class Contact {
	static async create(ctt:any): Promise<ContactModel> {
		const newContact:any = {};
		Object.entries(ctt).forEach(([property, value]) => {
			newContact[property.replaceAll("_", "")] = value;
		});

		try {
	 		const { vid } = await hubspot.contacts.create({ properties: newContact });
	 		return new ContactModel({ ...ctt, vid });
		} catch (err) {
			let contactEmail = newContact.email;
			const { vid } = await hubspot.contacts.getByEmail(String(contactEmail));
			return new ContactModel({ ...ctt, vid });
		}
	}
}

export default Contact;
export { ContactModel };
