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

  const regex = new RegExp(/^\d+\.*\d{0,2}$/);
  // const regex = new RegExp(/^\d+(?:\.\d{0,2})$/)

  // const numEventId = Number(eventId)
  const filtered = tickets.filter((ticket) => ticket.event_id === +eventId)

  const newTime = new Date(event?.time)

  //to preview date
  let newMonth;
  let tester = String(newTime.getMonth() + 1)
  console.log(newTime.getMonth() + 1)
  if (tester.length < 2 && tester.length > 0) {
    newMonth = `0${tester}`
    console.log(newMonth, "===========NEW Month")
  }

  let newDay;
  let tester2 = String(newTime.getDate())
  if (tester2.length < 2 && tester2.length > 0) {
    newDay = `0${newTime.getDate()}`
  }

  let newMinute;
  let tester3 = String(newTime.getMinutes())
  if (tester3.length < 2 && tester3.length > 0) {
    newMinute = `0${newTime.getMinutes()}`
  }


  let newHour;
  let tester4 = String(newTime.getUTCHours())
  if (tester4.length < 2 && tester4.length > 0) {
    newHour = `0${newTime.getUTCHours()}`
  }

  const today = new Date()
  const todayString = `${today.toISOString().split('T')[0]}T00:00`
  // console.log(todayString)

  const [name, setName] = useState(event?.name)
  const [description, setDescription] = useState(event?.description)

  const [time, setTime] = useState(`${newTime.getFullYear()}-${tester.length < 2 ? newMonth : newTime?.getMonth() + 1}-${tester2.length < 2 ? newDay : newTime?.getDate()}T${tester4.length < 2 ? newHour : newTime?.getUTCHours()}:${tester3.length < 2 ? newMinute : newTime.getMinutes()}`)
  const [price, setPrice] = useState(event?.price)
  const [location, setLocation] = useState(event?.location)
  const [pic_url, setPic_Url] = useState(event?.pic_url)
  const [errors, setErrors] = useState([]);

  // console.log(time)

  useEffect(() => {
    dispatch(allTickets(user.id))
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = [];

    if (name.length === 0) {
      error.push("Please enter the name of the event")
    }
    if (name.length > 50) {
      error.push("Name of event must be less than 50 characters")
    }
    if (description.length === 0) {
      error.push("Please describe your event")
    }
    if (time.length === 0) {
      error.push("Please provide time & date of event")
    }
    if (price.length === 0) {
      error.push("Please enter a ticket price")
    }
    if (isNaN(price)) {
      error.push("Price must be a number")
    }
    if (!regex.test(price)) {
      error.push("Price must be at max 2 decimals: xx.xx")
    }
    if (location.length === 0) {
      error.push("Please input the location of your event")
    }
    if (pic_url.length === 0) {
      error.push("Please input a picture url")
    }
    setErrors(error)


    const payload = {
      ...event,
      name,
      description,
      time,
      price,
      location,
      pic_url
    }


    if (!error.length) {
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

  }

  return (
    <div className="edit_form_container">
      <form onSubmit={handleSubmit}>
        <div className="error_text">
          {errors.map((error, ind) => (
            <div key={ind}>*{error}</div>
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
          <input type="datetime-local" min={todayString} className="form_inputs" value={time} placeholder='Time' onChange={(e) => setTime(e.target.value)} />
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
          <input type="url" pattern="https?://.+" className="form_inputs" value={pic_url} placeholder='Picture URL' onChange={(e) => setPic_Url(e.target.value)} />
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
