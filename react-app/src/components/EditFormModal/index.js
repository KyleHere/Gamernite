import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { deleteOneTicket, allTickets } from "../../store/ticket";
import { deleteEvent, updateEvent } from "../../store/event";
import './EditFormModal.css'

function EditEventForm({ openModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => Object.values(state.eventsReducer))
  const event = useSelector((state) => state?.eventsReducer[eventId])
  const tickets = useSelector(state => Object.values(state.ticketsReducer))

  // const numEventId = Number(eventId)
  const filtered = tickets.filter((ticket) => ticket.event_id === +eventId)

  const newTime = new Date(event?.time)

  let newMonth;
  let tester = String(newTime?.getMonth()) //getMonth() returns a number usually so .length returns unexpected
  if (tester.length < 2 && tester.length > 0) { //brute force month conversion for months before OCT
    newMonth = `0${newTime?.getMonth()}`
  }

  let newDay;
  let tester2 = String(newTime.getDate())
  if (tester2.length < 2 && tester2.length > 0) {
    newDay = `0${newTime.getDate()}`
  }

  const [name, setName] = useState(event?.name)
  const [description, setDescription] = useState(event?.description)

  const [time, setTime] = useState(`${newTime.getFullYear()}-${tester.length < 2 ? Number(newMonth) + 1 : newTime?.getMonth()}-${tester2.length < 2 ? newDay : newTime?.getDate()}T${newTime?.getUTCHours()}:${newTime?.getUTCMinutes()}`)
  const [price, setPrice] = useState(event?.price)
  const [location, setLocation] = useState(event?.location)
  const [pic_url, setPic_Url] = useState(event?.pic_url)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(allTickets(user.id))
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(time)


    if (name.length === 0) {
      setErrors(["Please enter the name of the event"])
    }
    else if (name.length > 50) {
      setErrors(["Name of event must be less than 50 characters"])
    }
    else if (description.length === 0) {
      setErrors(["Please describe your event"])
    }
    else if (time.length === 0) {
      setErrors(["Please provide time & date of event"])
    }
    else if (price.length === 0) {
      setErrors(["Please enter a ticket price"])
    }
    else if (typeof (price) !== 'number') {
      setErrors(["Price must be a number"])
    }
    else if (location.length === 0) {
      setErrors(["Please input the location of your event"])
    }
    else if (pic_url.length === 0) {
      setErrors(["Please input a picture url"])
    }


    const payload = {
      ...event,
      name,
      description,
      time,
      price,
      location,
      pic_url
    }

    // console.log(time)

    if (!errors.length) {
      let editedEvent = await dispatch(updateEvent(payload, eventId))
      if (editedEvent) {
        openModal()
        history.push(`/events/${eventId}`)
      }
    }

  }

  const handleDelete = () => {
    openModal()

    for (let i = 0; i < filtered.length; i++) {
      dispatch(deleteOneTicket(filtered[i].id))
    }

    dispatch(deleteEvent(eventId))
      .then(() => {
        return history.push('/')
      })
    // console.log('DELETED------', deleted)
    // if (deleted) {
    //   history.push('/')
    // }
  }

  return (
    <div className="edit_form_container">
      <form onSubmit={handleSubmit}>
        <div className="error_text">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h3>Edit your Event</h3>
        <button className="delete_form_button" onClick={handleDelete}>Delete Event</button>
        <div className="form_input_div">
          <label>Name</label>
          <input type="text" className="form_inputs" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Time</label>
          <input type="datetime-local" className="form_inputs" value={time} placeholder='Time' onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Price</label>
          <input type="text" className="form_inputs" value={price} placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Location</label>
          <input type="text" className="form_inputs" value={location} placeholder='Location' onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Picture URL</label>
          <input type="text" className="form_inputs" value={pic_url} placeholder='Picture URL' onChange={(e) => setPic_Url(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Description</label>
          <input type="text" className="form_inputs" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form_input_div">
          <button className="edit_form_button" type="submit">Save</button>
        </div>
      </form>
    </div>
  )

}

export default EditEventForm
