const GET_TICKETS = 'tickets/GET_TICKETS'
const CREATE_TICKET = 'tickets/CREATE_TICKET'


const getTickets = (tickets) => ({
  type: GET_TICKETS,
  tickets
})

const newTicket = (payload) => ({
  type: CREATE_TICKET,
  payload
})

export const allTickets = () => async dispatch => {
  const res = await fetch(`/api/tickets/`)
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
    default:
      return state;
  }
}
