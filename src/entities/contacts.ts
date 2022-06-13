import hubspot from "../services/hubspot";
import { ContactFromDB, ContactProps } from "../common/interfaces";
import { mergeValues, count } from "../utils";

class Contacts {
	private contacts:any[];
	private listID:number;
	constructor(listID:number, contacts?:any) {
		this.listID = listID;
		this.contacts = contacts || []; 
	}

	async add(ctt:ContactProps): Promise<ContactFromDB> {
		return hubspot.lists.addContacts(this.listID, { vids: [ ctt.vid ] })
			.then((res:ContactFromDB) => {
				this.contacts.push(ctt)
				console.log(`Contacts -> ${ctt.email} has been added`);
				return res
			})
	}

	get domains() {
		const domains:any[] = [];
		const domainNames:string[] = mergeValues(this.contacts.map(ctt => ctt.email.split('@')[1]));
		domainNames.forEach(domain => {
			const quantity = count(this.contacts, (contact:any) => {
				return contact.email.includes(domain)
			});
			domains.push({ domain, quantity });
		})
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
	static async load(listId:number) {
    const contacts:any[] = [];
    let vidOffset = 0;
    let hasMore = false;

    do {
      let data = await hubspot.apiRequest({
        method: 'GET',
        path: `/contacts/v1/lists/${listId}/contacts/all`,
        qs: { vidOffset },
        qsStringifyOptions: { indices: false },
      })

      for (let i=0; i < data.contacts.length; i++) {
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

	static async create(configs:{ name:string }) {
		const { listId } = await hubspot.lists.create(configs);
		console.log(`ContactsFactory -> list (id: ${listId}, name: ${configs.name}) was created`);
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
