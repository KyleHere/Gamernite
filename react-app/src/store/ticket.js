const GET_TICKETS = 'tickets/GET_tickets'

const getTickets = (tickets) => ({
  type: GET_TICKETS,
  tickets
})

export const allTickets = () => async dispatch => {
  const res = await fetch(`/api/tickets/`)
  if (res.ok) {
    const tickets = await res.json();
    dispatch(getTickets(tickets))
    return tickets
  }
}

const initialState = {};

export default function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS: {
      return { ...state, ...action.tickets }
    }
    default:
      return state;
  }
}
