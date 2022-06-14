import hubspot from "../services/hubspot";
import { ContactFromDB, ContactProps, Domain } from "../common/interfaces";
import { mergeDuplicate, count } from "../utils";

class Contacts {
	private contacts:ContactProps[];
	private listID:number;
	constructor(listID:number, contacts?:ContactProps[]) {
		this.listID = listID;
		this.contacts = contacts || []; 
	}

	private log(msg:string): void {
		console.log(`Contacts -> ${msg}`);
	}

	async add(ctt:ContactProps): Promise<ContactFromDB> {
		return hubspot.lists.addContacts(this.listID, { vids: [ ctt.vid ] })
			.then((res:ContactFromDB) => {
				this.contacts.push(ctt)
				this.log(`${ctt.email} has been added`);
				return res
			})
	}

	get domains(): Domain[] {
		const domains:Domain[] = [];
		const domainNames:string[] = mergeDuplicate(this.contacts.map(ctt => ctt.email.split('@')[1]));
		domainNames.forEach(domain => {
			const quantity = count(this.contacts, (contact:ContactProps) => {
				return contact.email.includes(domain)
			});
			domains.push({ domain, quantity });
		})
		return domains;
	}

	get show(): ContactProps[] {
		return this.contacts;
	}

	get length(): number {
		return this.contacts.length;
	}
}

class ContactsFactory {
	private static log(msg:string): void {
		console.log(`ContactsFactory -> ${msg}`);
	}

	static async load(listId:number): Promise<Contacts> {
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

	static async create(configs:{ name:string }): Promise<Contacts> {
		const { listId } = await hubspot.lists.create(configs);
		this.log(`list (id: ${listId}, name: ${configs.name}) was created`);
		return new Contacts(listId);
	}

	static async destroyAll() {
		const { lists } = await hubspot.lists.get();
		this.log(`${lists.length} will be destroyed`);
		for (let i=0; i < lists.length; i++) {
			let listId = lists[i].listId;
			await hubspot.lists.delete(listId);
		}
	}
}

export { ContactsFactory, Contacts };
