import React from "react";
import contactUsIcon from '../assets/images/contact-us.png';
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from 'react-icons/md';


const ContactUs = (props) => {
    return (
        <div className="contact-section" id="contact-us">
            <div className="contact-image">
                <img className="contact-icon" src={contactUsIcon} width="400" height="400" alt="contactUsIcon" />
            </div>

            <div className="contact-form gap-3">
                <span>Get in touch</span>
                <div className="input-container">
                    <BsFillPersonFill size={20} />
                    <input type="text" placeholder="Name" />
                </div>

                <div className="input-container">
                    <MdEmail size={20} />
                    <input type="text" placeholder="Email" />
                </div>

                <div className="textarea-container">
                    <textarea type="text" placeholder="Message" rows="8"></textarea>
                </div>

                <button className="btn-send" type="button">Send</button>
            </div>
        </div>
    )
}

export default ContactUs;