const GET_EVENTS = 'events/GET_EVENTS'
const CREATE_EVENT = 'events/CREATE_EVENT'
const UPDATE_ONE = 'events/UPDATE_ONE'
const DELETE_ONE = 'events/DELETE_ONE'

const getEvents = (events) => ({
  type: GET_EVENTS,
  events
})

const createEvent = (payload) => ({
  type: CREATE_EVENT,
  payload
})

const update = (payload) => ({
  type: UPDATE_ONE,
  payload
})

const deleteOne = (id) => ({
  type: DELETE_ONE,
  id
})

export const allEvents = () => async dispatch => {
  const res = await fetch(`/api/events`)
  if (res.ok) {
    const events = await res.json()
    dispatch(getEvents(events))
    return events
  }
  return res
}

export const createNewEvent = (payload) => async dispatch => {
  const res = await fetch('/api/events/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    const data = await res.json();
    console.log('THIS IS MY DATA ===================================', data)
    await dispatch(createEvent(payload))
    return data
  }
}

export const updateEvent = (payload) => async dispatch => {
  const res = await fetch(`/api/events/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json();

    await dispatch(update(payload))
    return data;
  }
}

export const deleteEvent = (id) => async dispatch => {
  const res = await fetch(`/api/events/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleted = await res.json();
    dispatch(deleteOne(id))
    return deleted
  }
}



const initialState = {};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return { ...state, ...action.events }
    }
    case CREATE_EVENT: {
      const newState = { ...state }
      return newState
    }
    case UPDATE_ONE: {
      //DOESNT WORK
      const updatedState = { ...state, [action.payload.id]: action.payload }
      return updatedState
    }
    case DELETE_ONE: {
      let afterState = { ...state }

      delete afterState[action.id]
      return afterState
    }
    default:
      return state;
  }
}
