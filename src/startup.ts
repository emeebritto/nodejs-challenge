import hubspot from "./services/hubspot";

// CREATE INITIAL LIST "myContacts"
(async() => {
	const listName = "MyContacts";
	const result = await hubspot.lists.get();
	const listEvenExists = result.lists.some((list:any) => list.name === listName);
	if (!listEvenExists) {
		hubspot.lists.create({
	    "name": listName,
	    "dynamic": true,
	    "filters": [
	      [
	        {
	          "operator": "EQ",
	          "value": "Alice",
	          "property": "firstname",
	          "type": "string"
	        }
	      ]
	    ]
	  })		
	};
})()
