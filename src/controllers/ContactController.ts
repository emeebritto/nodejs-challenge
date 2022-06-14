import { Request, Response } from "express";
import hubspot from "../services/hubspot";
import { listName } from "../consts";
import { ContactsFactory, Contacts } from "../entities/contacts";

class ContactsController {
  private async getContacts(): Promise<Contacts> {
    const { lists } = await hubspot.lists.get();
    const { listId } = lists.find((list:{name:string}) => list.name.includes(listName));
    const contacts = await ContactsFactory.load(listId);
    return contacts;
  }

  public async contacts(req:Request, res:Response) {
    try {
      const contacts:Contacts = await this.getContacts();
      return res.json({ response: contacts });
    } catch(err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: "Internal Service Error" });
    }      
  }

  public async domains(req:Request, res:Response) {
    try {
      const contacts:Contacts = await this.getContacts();
      return res.json({ response: contacts.domains });
    } catch(err) {
      console.error(err);
      res.status(500).json({ status: 500, msg: "Internal Service Error" });
    }
  }
}

const contactsController = new ContactsController();
export default contactsController;