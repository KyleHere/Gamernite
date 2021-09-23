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
  // console.log(events)
  const thisEvent = events?.find((event) => event.id === +eventId)

  const openModal = () => {
    setShowEditEvent(!showEditEvent)
  }

  const openTicketModal = () => {
    setShowTicket(!showTicket)
  }

  useEffect(() => {
    dispatch(allEvents())
  }, [showEditEvent])



  return (
    <div className="event_detail_entire">
      <div className="event_detail_container">
        <div className="event_detail_img_container">
          <img className="event_detail_img" src={thisEvent?.pic_url} />
        </div>
        <div>
          <div className="event_detail">
            <h1>{thisEvent?.name}</h1>
          </div>

          <div className="event_detail">
            <p>{thisEvent?.time}</p>
          </div>
          <div className="event_detail">
            <p>${thisEvent?.price.toFixed(2)}</p>
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
