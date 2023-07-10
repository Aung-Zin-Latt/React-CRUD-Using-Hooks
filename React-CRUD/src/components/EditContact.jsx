import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = ({ contacts, updateContactHandler }) => {
  console.log(contacts);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  console.log("Name", name, "Email", email);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const selectedContact = contacts.find(contact => contact.id === id);

    if (selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
    }
  }, [contacts, id]);

  const update = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    const updateContact = {
      id: id,
      name,
      email,
    };

    // updatedContact is from App.jsx
    updateContactHandler(updateContact);
    setName("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
