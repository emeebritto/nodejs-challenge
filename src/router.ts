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
router
	.route("/contacts")
	.get(contactsController.contacts.bind(contactsController));

router
	.route("/contacts/domains")
	.get(contactsController.domains.bind(contactsController));

export { router };
