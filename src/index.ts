import { App } from "./app";
import "./startup";

new App().startup(() => {
	console.log('Server is running on port 3000')
});
