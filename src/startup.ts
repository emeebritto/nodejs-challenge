import path from "node:path";
import hubspot from "./services/hubspot";
import csvReader from "./utils/csv";
import Contact from "./entities/contact";
import Contacts from "./entities/contacts";
import "./polyfill";

// CREATE INITIAL LIST "myContacts"
// (async() => {
// 	const listName = "MyContacts";
// 	const result = await hubspot.lists.get();
// 	const listEvenExists = result.lists.some((list:any) => list.name === listName);
// 	if (!listEvenExists) {
// 		hubspot.lists.create({
// 	    "name": listName,
// 	    "dynamic": true,
// 	    "filters": [
// 	      [
// 	        {
// 	          "operator": "EQ",
// 	          "value": "Alice",
// 	          "property": "firstname",
// 	          "type": "string"
// 	        }
// 	      ]
// 	    ]
// 	  })		
// 	};
// })()

// CREATE INITIAL LIST "myContacts"
(async() => {
  try {
  	await hubspot.lists.delete(16);
    const dataPath = path.join(__dirname, './data/contatos.csv');
    const csvObj = await csvReader.loadCSV(dataPath);
    const timestamp =  new Date().getTime();
    const candidateName = "emerson.britto";
		const listName = `${candidateName}.${timestamp}`;
		const result = await hubspot.lists.get();
		console.log(result);
		const listEvenExists = result.lists.some((list:any) => list.name.includes(candidateName));
		if (!listEvenExists) {
			const { listId } = await hubspot.lists.create({ "name": listName });
			console.log(`list (name: ${listName}) was created`);

			console.log('registering initial data to list...');
			const contactsVid:any[] = [];
			const contacts = new Contacts(listId);
			for (let i=0; i < csvObj.length; i++) {
				const contact = await Contact.create(csvObj[i]);
				contacts.add(contact);
		  };
		  console.log('initial data registered successfully');
		}

    // await communicationHubspot.addContactsList(listVidContacts, listId);
    // console.log('contacts added successfully');
    // return listId;
  } catch ({ error }) {
  	console.log(error);
  }
})()
