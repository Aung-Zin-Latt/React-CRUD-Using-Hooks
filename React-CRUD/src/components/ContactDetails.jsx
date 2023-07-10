import React from 'react'
import { Link, useParams } from 'react-router-dom'
import user from '../assets/images/user.png'

const ContactDetails = ({ contacts }) => {
    const { id } = useParams();
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
        return <div>Contact not found!</div>;
    }

    const { name, email } = contact;
    // const { name, email } = props.location.state.contact;
    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt='user' />
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>

            <div className='center-div'>
                <Link to="/">
                    <button className='ui button blue center'>Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}


export default ContactDetails;