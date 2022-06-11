import { App } from "./app"
new App().server.listen(3000, () => {
	console.log('Serve is running on port 3000')
});
