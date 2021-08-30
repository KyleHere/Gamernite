import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { allEvents } from '../../store/event'

const Homepage = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(allEvents())
  }, [])

  return (
    <div>
      <h2>Homepage Text</h2>

    </div>
  )
}

export default Homepage
