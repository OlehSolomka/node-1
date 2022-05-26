const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacs = async (contactList) => {
  const data = JSON.stringify(contactList, null, 2);
  await fs.writeFile(contactsPath, data);
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    return contactList.find((contact) => contact.id == contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts();
    const index = contactList.findIndex((contact) => contact.id == contactId);

    if (index === -1) {
      return null;
    }

    const [deletedContact] = contactList.splice(index, 1);
    await updateContacs(contactList);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
    const data = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    try {
        const contactList = await listContacts()
        contactList.push(data)
        await updateContacs(contactList)
        return data;
        
    } catch (error) {
       console.log(error.message); 
    }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
