import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { allEvents } from '../../store/event'

const Homepage = () => {
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => Object.values(state.eventsReducer))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allEvents())
  }, [])

  return (
    <div>
      <h2>Homepage Text</h2>
      {events?.map(event =>
      (<div key={event.id}>
        <div>
          <p> {event.name} </p>
        </div>
      </div>))}
    </div>
  )
}

export default Homepage
