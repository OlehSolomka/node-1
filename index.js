const { program } = require("commander");
const contactOperations = require("./contacts");

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");
program.parse(process.argv);

const opts = program.opts();

const invokeAction = async ({ action, name, email, phone, id }) => {
  switch (action) {
    case "list":
      const contactList = await contactOperations.listContacts();
      console.table(contactList);
      return contactList;
    case "get":
      const selectedContact = await contactOperations.getContactById(id);
      console.log(selectedContact);
      return selectedContact;
    case "remove":
      const deletedContact = await contactOperations.removeContact(id);
      console.log(deletedContact);
      return deletedContact;
    case "add":
      const addedContact = await contactOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addedContact);
      return addedContact;

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(opts);
