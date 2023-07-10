import React from 'react'
import { Link } from 'react-router-dom'
import user from "../assets/images/user.png"

const ContactCard = (props) => {

    // console.log("ContactCard Props", props)
    const {id, name, email} = props.contact;
    return (
        <div className='item' key={id} style={{ display: 'flex', alignItems: 'center' }}>
            <img className='ui avatar image' src={user} alt='User Image' />
            <div className='content' style={{ flex: '1' }}>
                <Link to={{ pathname:`/contact/${id}`, state:{contact: props.contact} }}>
                <div className='header'>{name}</div>
                <div>{email}</div>
                </Link>
            </div>

            <Link to={{ pathname:`/edit/${id}`, state:{contact: props.contact} }}>
                <i
                    className='edit alternate outline icon'
                    style={{ color: 'blue', marginTop: '7px' }}
                ></i>
            </Link>

            <i 
                onClick={() => props.clickHandler(id)}
                className='trash alternate outline icon'
                style={{ color: 'red', marginTop: '7px', marginLeft: '10px' }}
            ></i>

        </div>
    )
}


export default ContactCard;