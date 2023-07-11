import React, { useState, useEffect } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "tickets"),
      (collectionSnapshot) => {
        const tickets = [];
        collectionSnapshot.forEach((doc) => {
          tickets.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setMainTicketList(tickets);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleAddingsNewTicketToList = async (newTicketData) => {
    await addDoc(collection(db, "tickets"), newTicketData);
    setFormVisibleOnPage(false);
  };

  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setEditing(false);
      setSelectedTicket(null);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter((ticket) => ticket.id === id)[0];
    setSelectedTicket(selection);
  };

  const handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(
      (ticket) => ticket.id !== id
    );
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
      .filter((ticket) => ticket.id !== selectedTicket.id)
      .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    setEditing(false);
    setSelectedTicket(null);
  };

  if (auth.currentUser == null) {
    return (
      <>
        <h1>You must be signed in to access the queue.</h1>
      </>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing) {
      currentlyVisibleState = (
        <EditTicketForm
          ticket={selectedTicket}
          onEditTicket={handleEditingTicketInList}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={selectedTicket}
          onClickingDelete={handleDeletingTicket}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={handleAddingsNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={mainTicketList}
          onTicketSelection={handleChangingSelectedTicket}
        />
      );
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}

export default TicketControl;