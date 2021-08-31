import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { allEvents } from '../../store/event'

import './homepage.css'

const Homepage = () => {
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => Object.values(state.eventsReducer))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allEvents())
  }, [])

  return (
    <div className="homepage_content">
      <h2>Homepage Text</h2>
      <div className="event_container">
        {events?.map(event =>
        (
          <Link className="event_card" to={`/events/${event.id}`}>
            <div className="event_item" key={event.id}>

              <img className="event_pic" src={event.pic_url} />

              <div className="event_info">
                {/* <Link to={`/events/${event.id}`}> */}
                <p className="event_p"> {event.name} </p>
                <p className="event_p"> {event.time} </p>
                <p className="event_p"> {event.location} </p>
                <p className="event_p"> Starts at ${event.price} </p>
                {/* </Link> */} 
              </div>
            </div>
          </Link>))}
      </div>
    </div >
  )
}

export default Homepage
