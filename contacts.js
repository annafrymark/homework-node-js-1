const fs = require("fs").promises;
const path = require("path");

//const contactsPath = path.join(__dirname, "db", "contacts.json");
const contactsPath = path.resolve("./db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const contactFound = parsedContacts.find(
      (contact) => contact.id === contactId
    );
    console.table(contactFound);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const filtredContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    console.table(filtredContacts);
    fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
    console.log("Contact deleted");
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const newContact = { id, name, email, phone };

    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    parsedContacts.push(newContact);
    console.table(parsedContacts);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
    console.log(`Contact '${name}' added`);
  } catch (error) {
    console.log(error);
  }
}


module.exports = { listContacts, getContactById, removeContact, addContact };


