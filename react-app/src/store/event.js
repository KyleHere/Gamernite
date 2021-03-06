const GET_EVENTS = 'events/GET_EVENTS'
const CREATE_EVENT = 'events/CREATE_EVENT'
const UPDATE_ONE = 'events/UPDATE_ONE'
const DELETE_ONE = 'events/DELETE_ONE'
const GET_ONE = 'events/GET_ONE'

const getEvents = (events) => ({
  type: GET_EVENTS,
  events
})

const createEvent = (payload) => ({
  type: CREATE_EVENT,
  payload
})

const update = (payload, id) => ({
  type: UPDATE_ONE,
  payload,
  id
})

const deleteOne = (id) => ({
  type: DELETE_ONE,
  id
})

const getOneEventThunk = (id) => ({
  type: GET_ONE,
  id
})

export const allEvents = () => async dispatch => {
  const res = await fetch(`/api/events/`)
  if (res.ok) {
    const events = await res.json()
    dispatch(getEvents(events))
    return events
  }
  return res
}

export const getOneEvent = (id) => async dispatch => {
  const res = await fetch(`/api/events/${id}`)

  if (res.ok) {
    const oneEvent = await res.json()
    dispatch(getOneEventThunk(oneEvent))
    return oneEvent
  }

}

export const createNewEvent = (payload) => async dispatch => {

  const res = await fetch('/api/events/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    const data = await res.json();

    await dispatch(createEvent(data))
    return data
  }
}

export const updateEvent = (payload, id) => async dispatch => {
  const res = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json();

    await dispatch(update(data, id))
    return data;
  }
}

export const deleteEvent = (id) => async dispatch => {
  const res = await fetch(`/api/events/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    await res.json();
    dispatch(deleteOne(id))
    return res
  }
}



const initialState = {

};

export default function eventsReducer(state = initialState, action) {
  // const newState = { ...state }
  switch (action.type) {
    case GET_EVENTS: {
      return { ...action.events }
    }
    case CREATE_EVENT: {
      const newState = { ...state, }

      return newState
    }
    case UPDATE_ONE: {
      //DOESNT WORK
      let updatedState = { ...state }
      updatedState[action.id] = action.payload
      return updatedState
    }
    case DELETE_ONE: {
      let afterState = { ...state }

      delete afterState[action.id]
      return afterState
    }
    case GET_ONE: {
      return { ...state }
    }
    default:
      return state;
  }
}
