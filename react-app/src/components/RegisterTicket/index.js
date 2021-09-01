import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createTicket } from "../../store/ticket";

import "./RegisterTicket.css"
const RegisterTicketForm = () => {
  const [numOfTickets, setNumOfTickets] = useState("")

  const user = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return <Redirect to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      numOfTickets
    }

    dispatch(createTicket(payload))

    history.push("/")
  }

  const cancel = () => {
    history.push("/")
  }

  return (
    <div>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="ticket_h3">
          <h3 >How many tickets would you like to purchase?</h3>
        </div>
        <div className="ticket_input">
          <input type="text" className="input" placeholder="# of Tickets" onChange={(e) => setNumOfTickets(e.target.value)} value={numOfTickets} required></input>
        </div>
        <div className="ticket_form_buttons">
          <button type="submit">
            Submit
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>


      </form>
    </div>
  )
}

export default RegisterTicketForm;
