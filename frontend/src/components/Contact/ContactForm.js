import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contactContainer">
      <h1>Head Quaters</h1>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi
        ipsum sequi illo eligendi itaque. Tempora, recusandae nemo aperiam
        ducimus eum dicta animi iusto nulla dolorum. Animi consectetur aperiam
        placeat.
      </span>
      <h1>Offices</h1>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi
        ipsum sequi illo eligendi itaque. 
      </span>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi
        ipsum sequi illo eligendi itaque. 
      </span>
      <a className="mailBtn" href="mailto:daintreeindia@gmail.com">
        Email: daintreeindia@gmail.com
      </a>
      <div style={{height:"17vmax"}}></div>
    </div>
    
  )
}

export default ContactForm;
