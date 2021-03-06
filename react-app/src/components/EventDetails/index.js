import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { allEvents } from "../../store/event";

import { Modal } from "../../context/Modal";
import EditEventForm from "../EditFormModal";
import RegisterTicketForm from "../RegisterTicket";

import './EventDetails.css'

const EventDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => Object.values(state.eventsReducer))

  const thisEvent = events?.find((event) => event.id === +eventId)

  let timeOfDay;
  if (new Date(thisEvent?.time).getUTCHours() > 12) {
    timeOfDay = ' PM';
  }
  else {
    timeOfDay = 'AM'
  }

  const openModal = () => {
    setShowEditEvent(!showEditEvent)
  }

  const openTicketModal = () => {
    setShowTicket(!showTicket)
  }

  useEffect(() => {
    dispatch(allEvents())
  }, [showEditEvent])

  // let converted;


  return (
    <div className="event_detail_entire">
      <div className="event_detail_container">
        <div className="event_detail_img_container">
          {/* <img className="event_detail_img" src={thisEvent?.pic_url} /> */}
          {thisEvent?.pic_url.includes("jpeg") || thisEvent?.pic_url.includes("jpg") || thisEvent?.pic_url.includes("png") || thisEvent?.pic_url.includes("image") ? <img className="event_detail_img" src={thisEvent?.pic_url} /> : <img className="event_default_img" src="https://static.thenounproject.com/png/340719-200.png" />}
        </div>
        <div>
          <div className="event_detail">
            <h1>{thisEvent?.name}</h1>
          </div>

          <div className="event_detail">
            <p>{thisEvent?.time.slice(0, -12)} <br /> {new Date(thisEvent?.time).getUTCHours() > 12 ? new Date(thisEvent?.time).getUTCHours() - 12 : new Date(thisEvent?.time).getUTCHours()}:{new Date(thisEvent?.time).getMinutes()}{timeOfDay}</p>

            {/* <p></p> */}
          </div>
          <div className="event_detail">
            <p>${Number(thisEvent?.price).toFixed(2)}</p>
            {/* <p>${typeof(thisEvent?.price.toFixed(2)}</p> */}
          </div>
          <div className="event_detail">
            <p>{thisEvent?.location}</p>
          </div>
          <div className="event_detail">
            <p>{thisEvent?.description}</p>
          </div>
          <div className="edit_button_div">

          </div>
          <div className="ticket_register_div">
            {showEditEvent && (
              <Modal className='edit_modal' onClose={() => setShowEditEvent(false)}>
                <EditEventForm openModal={openModal} />
              </Modal>
            )}
            {user?.id === thisEvent?.user_id ?
              <button
                onClick={() => setShowEditEvent(true)}
                className='edit_button'
              >
                Edit Event
              </button>
              : null
            }
            {showTicket && (
              <Modal onClose={() => setShowTicket(false)}>
                <RegisterTicketForm openTicketModal={openTicketModal} />
              </Modal>
            )}
            <button className="ticket_register_button" onClick={() => setShowTicket(true)}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EventDetails
