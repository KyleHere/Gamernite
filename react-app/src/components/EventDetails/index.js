import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { allEvents } from "../../store/event";

import { Modal } from "../../context/Modal";
import EditEventForm from "../EditFormModal";
import RegisterTicketForm from "../RegisterTicket";

const EventDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [showTicket, setShowTicket] = useState(false)

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
    <div>
      <div>
        <h1>{thisEvent?.name}</h1>
        <p>{thisEvent?.description}</p>
        <p>{thisEvent?.time}</p>
        <p>{thisEvent?.price}</p>
        <p>{thisEvent?.location}</p>
        <p>{thisEvent?.pic_url}</p>
        {/* <img src={thisEvent?.pic_url} /> */}
      </div>
      <div className="edit_button_div">
        {showEditEvent && (
          <Modal className='edit_modal' onClose={() => setShowEditEvent(false)}>
            <EditEventForm openModal={openModal} />
          </Modal>
        )}
        <button
          onClick={() => setShowEditEvent(true)}
          className='edit_button'
        >
          Edit Event
        </button>
      </div>
      <div>
        {showTicket && (
          <Modal onClose={() => setShowTicket(false)}>
            <RegisterTicketForm openTicketModal={openTicketModal} />
          </Modal>
        )}
        <button onClick={() => setShowTicket(true)}>Register</button>
      </div>
    </div>
  )
}


export default EventDetails
