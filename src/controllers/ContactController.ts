import { Request, Response } from "express";
import hubspot from "../services/hubspot";
import { ContactsFactory } from "../entities/contacts";

class ContactsController{
  public async contacts(req:Request, res:Response) {
    const { lists } = await hubspot.lists.get();
    const { listId } = lists.find((list:any) => list.name.includes("emerson.britto"));
    const contacts = await ContactsFactory.load(listId);

    return res.json({
      response: contacts
    });
  }

  public async domains(req:Request, res:Response) {
    const { lists } = await hubspot.lists.get();
    const { listId } = lists.find((list:any) => list.name.includes("emerson.britto"));
    const contacts = await ContactsFactory.load(listId);

    return res.json({
      response: contacts.domains
    });
  }
}

const contactsController = new ContactsController();
export default contactsController;