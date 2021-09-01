import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createNewEvent } from "../../store/event";

const NewEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [pic_url, setPicUrl] = useState("");

  const user = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return <Redirect to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      time,
      price,
      location,
      pic_url
    }

    dispatch(createNewEvent(payload)) //needs an id to update

    history.push("/")
  }

  const cancel = () => {
    history.push("/")
  }

  return (
    <div>
      <h2>Upload a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Name of Event"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required>
          </input>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Time of Event"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            required>
          </input>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required>
          </input>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required>
          </input>
        </div>

        <div className="input_containers">
          <input
            type="text"
            className="input"
            placeholder="Picture"
            onChange={(e) => setPicUrl(e.target.value)}
            value={pic_url}
            required>
          </input>
        </div>

        <div className="input_containers">
          <textarea
            type="text"
            className="input"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required>
          </textarea>
        </div>

        <button className="create-button" type="submit">
          Create
        </button>
      </form>

      <div>
        <button className="cancel-button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default NewEventForm
