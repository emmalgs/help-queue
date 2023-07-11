import React from "react";
import ticketImage from "./../img/ticket.jpg";
import { Link } from 'react-router-dom';

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/sign-in'>Sign In</Link>
        </li>
      </ul>
      <img src={ticketImage} alt="tickets" width="200px"/>
    </React.Fragment>
  );
}

export default Header;