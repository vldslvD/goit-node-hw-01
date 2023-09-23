import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
}

export const getContactById = async(contactId) => {
  const contacts = await listContacts();
  const chosenContact = contacts.find(item => item.id === contactId);
  return chosenContact || null;
}

export const removeContact = async(contactId) =>{
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removed] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removed;
}

export const addContact = async ( name, email, phone ) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id,
    name,
    email,
    phone
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}