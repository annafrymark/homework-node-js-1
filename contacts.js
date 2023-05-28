const fs = require("fs").promises;
const path = require("path");
// const { table } = require("console");

// const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPath = path.resolve("./db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return console.table(JSON.parse(contacts));
  } catch (error) {
    return console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    return contact;
  } catch (error) {
    return console.log(error);
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filtredContacts = contacts.filter(contact => contact.id !== contactId);
  console.table(filtredContacts);
  fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  console.log(newContact);
  const contacts = await listContacts();
  contacts.push(newContact);
  console.table(contacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

//Zrób eksport utworzonych funkcji przez module.exports
module.exports = { listContacts, getContactById, removeContact, addContact };