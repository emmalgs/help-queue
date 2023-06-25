import React from "react";
import ticketImage from "./../img/ticket.jpg";

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketImage} alt="an image of tickets" />
    </React.Fragment>
  );
}

export default Header;