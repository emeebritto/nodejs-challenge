import { Router } from "express";
import contactsController from "./controllers/ContactController";

const router: Router = Router()

router.get("/", (req, res) => {
	res.json({
		creator: "Emerson-Britto",
		try: [
			"/contacts [GET]",
			"/contacts/domains [GET]"
		]
	})
})

//Routes
router.get("/contacts", contactsController.contacts);
router.get("/contacts/domains", contactsController.domains);

export { router };
