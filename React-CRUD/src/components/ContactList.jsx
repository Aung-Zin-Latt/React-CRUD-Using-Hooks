import React, { useState } from 'react'
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'

// Set the app element for react-modal
Modal.setAppElement('#root');

const ContactList = (props) => {
    // console.log(props);

    // for delete confirmation dialog box
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [contactToDelete, setContactToDelete] = useState(null)

    const deleteContactHandler = (id) => {
        // if (window.confirm('Are you sure, you want to delete this contact?')) {
        //     props.getContactId(id);
        //     toast.success('Contact deleted successfully!');
        // }
        setContactToDelete(id);
        setShowConfirmModal(true);
    };

    const confirmDeleteContact = () => {
        // Perform the delete operation and show the toast notification
        props.getContactId(contactToDelete);
        toast.success('Contact deleted successfully!');
        setShowConfirmModal(false);
    };

    const cancelDeleteContact = () => {
    setShowConfirmModal(false);
    };

    const renderContactList = props.contacts.map(contact => {
        return (
            <ContactCard 
                key={contact.id}
                contact={contact}
                clickHandler={deleteContactHandler}
            />
        )
    })

    return (
        <div className='main'>
            <h2>Contact Lists</h2>
            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>
            <div className='ui celled list'>{renderContactList}</div>

            <Modal
                isOpen={showConfirmModal}
                onRequestClose={cancelDeleteContact}
                style={confirmationModalStyles}
            >
                <div className="confirmation-content" style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0 }}>Confirmation</h3>
                    <p style={{ margin: '10px 0' }}>Are you sure you want to delete this contact?</p>
                    <div className='modal-buttons'>
                        <button onClick={confirmDeleteContact} className='ui button red'>
                        Yes
                        </button>
                        <button onClick={cancelDeleteContact} className='ui button'>
                        No
                        </button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
}


// Define CSS styles
const confirmationModalStyles = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '5px',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

export default ContactList;