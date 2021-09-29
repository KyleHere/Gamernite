import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createNewEvent } from "../../store/event";

import './NewEventForm.css'

import 'react-datepicker/dist/react-datepicker.css'

const NewEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [pic_url, setPicUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  const regex = new RegExp(/^\d+\.*\d{0,2}$/);

  const today = new Date()
  const todayString = `${today.toISOString().split('T')[0]}T00:00`

  if (!user) {
    return <Redirect to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = []

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
      name,
      description,
      time,
      price,
      location,
      pic_url
    }


    if (!error.length) {
      const created = await dispatch(createNewEvent(payload))
      if (created) {
        history.push("/")
      }
    }

  }

  const cancel = () => {
    history.push("/")
  }

  return (
    <div className="new_event_form_container">
      <h2>Upload a New Event</h2>
      <form className="new_event_form" onSubmit={handleSubmit}>
        <div className="error_text">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Name of Event"
            onChange={(e) => setName(e.target.value)}
            value={name}
          >
          </input>
        </div>

        <div className="input_containers">
          <input
            type="datetime-local"
            min={todayString}
            className="input"
            placeholder="Time of Event"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
          </input>

          {/* <DatePicker
            selected={time}
            onChange={(date) => setTime(date)}
            timeInputLabel="Time:"
            // dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            showTimeSelect
            timeFormat="p"
            timeIntervals={30}
            dateFormat="Pp"
          /> */}
          <p></p>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          >
          </input>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
          </input>
        </div>

        <div className="input_containers">
          <input
            type="url" pattern="https?://.+"
            className="input"
            placeholder="Picture URL"
            onChange={(e) => setPicUrl(e.target.value)}
            value={pic_url}
          >
          </input>
        </div>

        <div className="input_containers">
          <textarea
            type="text"
            className="input"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          >
          </textarea>
        </div>

        <button className="create_button" type="submit">
          Create
        </button>
      </form>

      <div>
        <button className="cancel_button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default NewEventForm
