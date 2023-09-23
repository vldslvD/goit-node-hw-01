import * as contactsOperations from "./contacts.js";
import { program } from "commander";

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      return console.log(contacts);

    case 'get':
      const selectedContact = await contactsOperations.getContactById(id);
      return console.log(selectedContact);

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone);
      return console.log(newContact);
    
    case 'update':
      const updatedContact = await contactsOperations.updateContact(id, name, email, phone);
      return console.log(updatedContact);

    case 'remove':
     const removedContact = await contactsOperations.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);