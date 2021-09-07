import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createTicket } from "../../store/ticket";
import { useParams } from "react-router";

import "./RegisterTicket.css"
const RegisterTicketForm = ({ openTicketModal }) => {
  const user = useSelector((state) => state.session.user)

  const [num_ticket, setNumTickets] = useState("")
  const [user_id, setUserId] = useState(user.id)
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

    if (num_ticket.length === 0) {
      setErrors(["Please input the number of tickets to purchase"])
    }

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
    <div>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="ticket_h3">
          <h3 >How many tickets would you like to purchase?</h3>
        </div>
        <div className="ticket_input">
          <input type="text" className="input" placeholder="# of Tickets" onChange={(e) => setNumTickets(e.target.value)} value={num_ticket}></input>
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
