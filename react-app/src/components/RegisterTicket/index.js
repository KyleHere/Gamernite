import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createTicket } from "../../store/ticket";
import { useParams } from "react-router";

import "./RegisterTicket.css"
const RegisterTicketForm = ({ openTicketModal }) => {
  const user = useSelector((state) => state.session.user)

  const [num_ticket, setNumTickets] = useState("")
  const [user_id, setUserId] = useState(user?.id)
  const [errors, setErrors] = useState([]);
  const { eventId } = useParams()

  const event_id = eventId

  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return <Redirect to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = []

    if (num_ticket.length === 0) {
      error.push("Please input the number of tickets to purchase")
    }
    if (isNaN(num_ticket)) {
      error.push("Input must be a number")
    }
    setErrors(error)

    const payload = {
      user_id,
      event_id,
      num_ticket
    }

    const createdTick = await dispatch(createTicket(payload))

    if (createdTick) {
      history.push(`/tickets/${user_id}`)
    }
  }

  const cancel = () => {
    openTicketModal()
    history.push(`/events/${eventId}`)
  }

  return (
    <div className="ticket_registration_div">
      <form onSubmit={handleSubmit}>
        <h2 className="ticket_h2">Event Registration</h2>
        <div className="ticket_error_messages">
          {errors.map((error, ind) => (
            <div key={ind}>*{error}</div>
          ))}
        </div>
        <div className="ticket_h3">
          <h3 >How many tickets would you like to purchase?</h3>
        </div>
        <div className="ticket_input">
          <input type="text" className="input" placeholder="# of Tickets" onChange={(e) => setNumTickets(e.target.value)} value={num_ticket}></input>
        </div>
        <div className="ticket_form_buttons">
          <button className="submit_event_button" type="submit">
            Submit
          </button>
          <button className="cancel_event_button" onClick={cancel}>Cancel</button>
        </div>
      </form>
      <div>
        <span>

        </span>
      </div>
    </div>
  )
}

export default RegisterTicketForm;
