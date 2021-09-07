import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useParams, useHistory } from "react-router"
import { allTickets, deleteOneTicket } from "../../store/ticket"

import './TicketsPage.css'

const TicketsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  // console.log(userId)
  const user = useSelector(state => state.session.user)
  const tickets = useSelector(state => Object.values(state.ticketsReducer))
  const events = useSelector(state => Object.values(state.eventsReducer))

  const filtered = tickets.filter((ticket) => ticket.user_id === user.id)
  // console.log(filtered)

  useEffect(() => {
    dispatch(allTickets(userId))
  }, [])

  const handleDelete = async (id) => {
    // openModal()
    dispatch(deleteOneTicket(id))
      .then(() => {
        return history.push(`/tickets/${user.id}`)
      })

    // await dispatch(deleteOneTicket(id))

    // history.push(`/tickets/${user.id}`)
  }

  return (
    <div className="ticket_container">
      <h2>Text</h2>
      {filtered?.map(ticket =>
      (
        <div key={ticket.id}>
          <div>
            <p>{ticket.id}</p>
            <button onClick={() => handleDelete(ticket.id)}>Remove Ticket</button>
          </div>
        </div>))}
    </div>
  )
}

export default TicketsPage
