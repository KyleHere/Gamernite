import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useHistory } from "react-router"
import { allTickets } from "../../store/ticket"

import './TicketsPage.css'

const TicketsPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const tickets = useSelector(state => Object.values(state.ticketsReducer))

  const filtered = tickets.filter

  useEffect(() => {
    dispatch(allTickets())
  }, [])




  return (
    <div className="ticket_container">
      <h2>Text</h2>
    </div>
  )
}

export default TicketsPage
