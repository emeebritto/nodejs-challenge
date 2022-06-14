import path from "node:path";
import config from "config";
import hubspot from "./services/hubspot";
import CSVReader from "./utils/csv";
import { listName } from "./consts";
import { ContactFactory } from "./entities/contact";
import { ContactsFactory } from "./entities/contacts";
import "./polyfill";

// CREATE INITIAL LIST "emerson.britto.[timestamp]"
(async() => {
  try {
  	if (config.get('onStartup.destroyAllList')) await ContactsFactory.destroyAll();
    const dataPath = path.join(__dirname, './data/contatos.csv');
    const csvObj = await CSVReader.loadCSV(dataPath);
    const timestamp =  new Date().getTime();
		const hubspotlistName = `${listName}.${timestamp}`;
		const result = await hubspot.lists.get();
		console.log(`Statup -> ${result.lists.length} list was founded`);
		const listEvenExists = result.lists.some((list:any) => list.name.includes(listName));
		if (!listEvenExists) {
			const contacts = await ContactsFactory.create({ name: hubspotlistName });
			console.log('registering initial data to list...');
			for (let i=0; i < csvObj.length; i++) {
				const contact = await ContactFactory.create(csvObj[i], { loadIfExists: true });
				contacts.add(contact);
		  };
		  console.log('initial data registered successfully');
		}
  } catch (err) {
  	console.log(err);
  }
})()
