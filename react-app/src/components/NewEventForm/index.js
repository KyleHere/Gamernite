import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createNewEvent } from "../../store/event";

import DatePicker from "react-datepicker";

import './NewEventForm.css'
// import "~react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker.css'

const NewEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [pic_url, setPicUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return <Redirect to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setErrors(["Please provide time of event [xx:xx am/pm] )"])
    }
    else if (price.length === 0) {
      setErrors(["Please enter a ticket price"])
    }
    else if (location.length === 0) {
      setErrors(["Please input the location of your event"])
    }
    // else if (location.length < 10) {
    //   setErrors(["Length of location must be at least 10 characters"])
    // }
    else if (pic_url.length === 0) {
      setErrors(["Please input a picture url"])
    }

    const payload = {
      name,
      description,
      time,
      price,
      location,
      pic_url
    }


    if (!errors) {
    }
    const created = await dispatch(createNewEvent(payload))
    if (created) {
      history.push("/")
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
            type="text"
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
