import "./env.config";
import { App } from "./app";
import "./startup";

new App().startup((port) => {
	console.log(`Server is running on port ${port}`);
});
