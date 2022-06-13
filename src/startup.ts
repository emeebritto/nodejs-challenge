import path from "node:path";
import hubspot from "./services/hubspot";
import CSVReader from "./utils/csv";
import { ContactFactory } from "./entities/contact";
import { ContactsFactory } from "./entities/contacts";
import "./polyfill";


// CREATE INITIAL LIST "emerson.britto.[timestamp]"
(async() => {
  try {
  	// await ContactsFactory.destroyAll();
    const dataPath = path.join(__dirname, './data/contatos.csv');
    const csvObj = await CSVReader.loadCSV(dataPath);
    const timestamp =  new Date().getTime();
    const candidateName = "emerson.britto";
		const listName = `${candidateName}.${timestamp}`;
		const result = await hubspot.lists.get();
		console.log(`Statup -> ${result.lists.length} list was founded`);
		const listEvenExists = result.lists.some((list:any) => list.name.includes(candidateName));
		if (!listEvenExists) {
			const contacts = await ContactsFactory.create({ name: listName });
			console.log('registering initial data to list...');
			for (let i=0; i < csvObj.length; i++) {
				const contact = await ContactFactory.create(csvObj[i], { loadIfExists: true });
				contacts.add(contact);
		  };
		  console.log('initial data registered successfully');
		}
  } catch ({ error }) {
  	console.log(error);
  }
})()
