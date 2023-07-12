import React, { useState, useEffect } from 'react'
// import { uuid } from 'uuidv4'
import { v4 as uuid } from 'uuid'
import api from './api/contactsApi'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import ContactDetails from './components/ContactDetails'
import EditContact from './components/EditContact'

const App = () => {

  const LOCAL_STORAGE_KEY = "contacts";

  // Retrive Contacts API
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      console.log("Error while retrieving contacts", error);
      return [];
    }
  }

  // const [contacts, setContacts] = useState(() => {
  //   const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return storedContacts ? JSON.parse(storedContacts) : [];
  // });
  const [ contacts, setContacts ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ searchResults, setSearchResult ] = useState([]);
  

  const addContactHandler = async (contact) => {
    // console.log(contact);
    try {
      const response = await api.post("/contacts", { id: uuid(), ...contact });
      console.log(response);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.log("Error while adding contact", error);
    }
  }

  // For Edit Contact
  const updateContactHandler = async (updatedContact) => { // updatedContact comes from EditContact.jsx
    // console.log("Updated ID", updatedContact);
    try {
      await api.put(`/contacts/${updatedContact.id}`, updatedContact);
      setContacts((prevContacts) => 
        prevContacts.map((contact) => 
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
      console.log("Latest Updated Contact is", contacts);
    } catch (error) {
      console.log("Error while updating contact", error);
    }
  }


  // Delete Contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList)
  }

  // For searching Contacts
  const searchHandler = (searchTerm) => { // 3
    // console.log("Search", searchTerm)

    // we will set searchTerm value in our searchTerm useState
    setSearchTerm(searchTerm) // 9
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); // .join() will convert object to string
      });
      setSearchResult(newContactList);
    }
    else {
      setSearchResult(contacts);
      // and then we need to check the condition in <ContactLists /> component
    }
  }


  useEffect(() => {
    // const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (storedContacts) {
    //   setContacts(JSON.parse(storedContacts));
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);
  

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  

  return (
    <>
      <div className='ui container'>
          <Header />
          <Routes>
            <Route
              path="/"
              exact
              element={<ContactList
                          contacts={searchTerm.length < 1 ? contacts : searchResults} 
                          getContactId={removeContactHandler}
                          term={searchTerm} // 1
                          searchKeyword={searchHandler} // 2
                      />} 
              // render={(props) => (
              //   <ContactList 
              //     {...props}
              //     contacts={contacts}
              //     getContactId={removeContactHandler}
              //   />
              // )}
            />
            <Route 
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />} 
            />

            <Route
              path="/contact/:id"
              element={<ContactDetails contacts={contacts} />}
            />

            <Route
              path="/edit/:id"
              element={<EditContact contacts={contacts} updateContactHandler={updateContactHandler}  />}
            >

            </Route>
          </Routes>
      </div>
    </>
  )
}

export default App
