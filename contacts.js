const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      if (!contact) {
        throw new Error(`Contact with id ${contactId} not found`);
      }
      return contact;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

function addContact(name, email, phone) {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: v4(), name, email, phone };
      contacts.push(newContact);
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => newContact);
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

function removeContact(contactId) {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        throw new Error(`Contact with id ${contactId} not found`);
      }
      const removedContact = contacts.splice(index, 1)[0];
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => removedContact);
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
