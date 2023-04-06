const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch((error) => console.error(error.message));
      break;

    case "get":
      getContactById(id)
        .then((contact) => console.log(contact))
        .catch((error) => console.error(error.message));
      break;

    case "add":
      addContact(name, email, phone)
        .then((newContact) => console.log(newContact))
        .catch((error) => console.error(error.message));
      break;

    case "remove":
      removeContact(id)
        .then((result) => console.log(result))
        .catch((error) => console.error(error.message));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
