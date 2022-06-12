import { ContactModel } from "./contact";
import hubspot from "../services/hubspot";

class Contacts {
	private contacts:any[];
	private listID:number;
	constructor(listID:number) {
		this.listID = listID;
		this.contacts = []; 
	}

	async add(ctt: ContactModel): Promise<any> {
		this.contacts.push(ctt);
		return await hubspot.lists.addContacts(this.listID, { vids: [ ctt.properties.vid ] })
	}

	get show() {
		return this.contacts;
	}

	get length() {
		return this.contacts.length;
	}
}

export default Contacts;



	// asyncMap() {
	// 	return new Promise((resolve, reject) => {
	// 		for (let i=0; i < this.length; i++) {
	// 			console.log(this[i]);
	// 		}
	// 	});
	// }