import hubspot from "../services/hubspot";
import { ContactFromDB, ContactProps } from "../common/interfaces";

class Contacts {
	private contacts:any[];
	private listID:number;
	constructor(listID:number) {
		this.listID = listID;
		this.contacts = []; 
	}

	async add(ctt:ContactProps): Promise<ContactFromDB> {
		return hubspot.lists.addContacts(this.listID, { vids: [ ctt.vid ] })
			.then((res:ContactFromDB) => {
				this.contacts.push(ctt)
				console.log(`Contacts -> ${ctt.email} has been added`);
				return res
			})
	}

	get show() {
		return this.contacts;
	}

	get length() {
		return this.contacts.length;
	}
}

class ContactsFactory {
	static load(listId:number) {
		return new Contacts(listId);
	}

	static async create(configs:{ name:string }) {
		const { listId } = await hubspot.lists.create(configs);
		console.log(`ContactsFactory -> list (name: ${configs.name}) was created`);
		return new Contacts(listId);
	}

	static async destroyAll() {
		const { lists } = await hubspot.lists.get();
		console.log(`ContactsFactory -> ${lists.length} will be destroyed`);
		for (let i=0; i < lists.length; i++) {
			let listId = lists[i].listId;
			await hubspot.lists.delete(listId);
		}
	}
}

//export default Contacts;
export { ContactsFactory };
