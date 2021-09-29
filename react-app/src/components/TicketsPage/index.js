import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useParams, useHistory, Redirect } from "react-router"
import { allTickets, deleteOneTicket } from "../../store/ticket"
import { allEvents } from "../../store/event"

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
  console.log(filtered)

  if (user.id !== +userId) {
    alert("Unauthorized [Incorrect User]");
    history.push('/')
    // window.location.reload();
  }

  useEffect(() => {
    dispatch(allTickets(userId))
    dispatch(allEvents())
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
  // const singleEvent = events?.find((event) => event.id === +eventId)
  return (
    <div className="ticket_container">
      <h2>Your Tickets</h2>
      {filtered?.map(ticket =>
      (
        <div className="ticket_div_container" key={ticket.id}>
          <div className="ticket_div">
            {events.filter((event) => event.id === ticket.event_id).map((singleEvent) => (
              <Link to={`/events/${singleEvent?.id}`}>
                <div className="single_event_container">
                  <div className="single_event_div">
                    {singleEvent?.pic_url.includes("jpeg") || singleEvent?.pic_url.includes("jpg") || singleEvent?.pic_url.includes("png") || singleEvent?.pic_url.includes("image") ? <img className="single_event_pic" src={singleEvent?.pic_url} /> : <img className="single_event_pic" src="https://static.thenounproject.com/png/340719-200.png" />}
                    {/* <img className="single_event_pic" src={singleEvent?.pic_url} /> */}
                  </div>
                  <div className="single_event_text">
                    <p>{singleEvent?.name}</p>
                    <p>{singleEvent?.time.slice(0, -12)} <br /> {new Date(singleEvent?.time).getUTCHours() > 12 ? new Date(singleEvent?.time).getUTCHours() - 12 : new Date(singleEvent?.time).getUTCHours()}:{new Date(singleEvent?.time).getMinutes()}{new Date(singleEvent?.time).getUTCHours() > 12 ? "PM" : "AM"} </p>
                    {/* <p>{singleEvent?.time}</p> */}
                    <p>{singleEvent?.location}</p>
                    <p className="single_event_text_num">Number of Tickets: {ticket.num_ticket}</p>
                  </div>
                </div>
              </Link>
            ))}
            <button className="single_event_button" onClick={() => handleDelete(ticket.id)}>Refund Ticket</button>
          </div>
        </div>))}
    </div>
  )
}

export default TicketsPage
