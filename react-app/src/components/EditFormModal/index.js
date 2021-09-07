import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { deleteEvent, updateEvent } from "../../store/event";
import './EditFormModal.css'

function EditEventForm({ openModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => Object.values(state.eventsReducer))
  const event = useSelector((state) => state?.eventsReducer[eventId])

  // name,
  // description,
  // time,
  // price,
  // location,
  // pic_url
  const [name, setName] = useState(event?.name)
  const [description, setDescription] = useState(event?.description)
  const [time, setTime] = useState(event?.time)
  const [price, setPrice] = useState(event?.price)
  const [location, setLocation] = useState(event?.location)
  const [pic_url, setPic_Url] = useState(event?.pic_url)



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...event,
      name,
      description,
      time,
      price,
      location,
      pic_url
    }
    let editedEvent = await dispatch(updateEvent(payload, eventId))

    if (editedEvent) {
      // setShowEditEvent(false)
      openModal()
      history.push(`/events/${eventId}`)
    }

  }

  const handleDelete = () => {
    openModal()
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
        <h3>Edit your Event</h3>
        <button className="delete_form_button" onClick={handleDelete}>Delete Event</button>
        <div className="form_input_div">
          <label>Name</label>
          <input type="text" className="form_inputs" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form_input_div">
          <label>Time</label>
          <input type="text" className="form_inputs" value={time} placeholder='Time' onChange={(e) => setTime(e.target.value)} />
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
