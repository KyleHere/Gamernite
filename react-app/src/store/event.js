const GET_EVENTS = 'events/GET_EVENTS'

const getEvents = (events) => ({
  type: GET_EVENTS,
  events
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

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return { ...state, ...action.events }
    }
    default:
      return state;
  }
}
