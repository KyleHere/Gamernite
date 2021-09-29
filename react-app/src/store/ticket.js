const GET_TICKETS = 'tickets/GET_TICKETS'
const CREATE_TICKET = 'tickets/CREATE_TICKET'
const DELETE_ONE = 'tickets/DELETE_ONE'

const getTickets = (tickets) => ({
  type: GET_TICKETS,
  tickets
})

const newTicket = (payload) => ({
  type: CREATE_TICKET,
  payload
})

const deleteTicket = (id) => ({
  type: DELETE_ONE,
  id
})

export const allTickets = (id) => async dispatch => {
  const res = await fetch(`/api/tickets/${id}`)

  if (res.ok) {
    const tickets = await res.json();
    dispatch(getTickets(tickets))
    return tickets
  }
}

export const createTicket = (payload) => async dispatch => {
  const res = await fetch('/api/tickets/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    const data = await res.json();
    await dispatch(newTicket(data))
    return data
  }
  // return res
}


export const deleteOneTicket = (id) => async dispatch => {
  const res = await fetch(`/api/tickets/${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    const data = await res.json();
    await dispatch(deleteTicket(id))
    return res
  }
}
const initialState = {};

export default function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS: {
      return { ...state, ...action.tickets }
    }
    case CREATE_TICKET: {
      const newState = { ...state }
      return newState
    }
    case DELETE_ONE: {
      let deleteState = { ...state }
      delete deleteState[action.id]
      return deleteState
    }
    default:
      return state;
  }
}
