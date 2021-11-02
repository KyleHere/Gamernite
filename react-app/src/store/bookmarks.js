const GET_BOOKMARKS = 'bookmarks/GET_BOOKMARKS'
const CREATE_BOOKMARK = 'bookmarks/CREATE_BOOKMARK'
const DELETE_BOOKMARK = 'bookmarks/DELETE_BOOKMARK'
// const GET_ONE = 'events/GET_ONE'

const getBookmarks = (bookmarks) => ({
  type: GET_BOOKMARKS,
  bookmarks
})

const createBookmark = (payload) => ({
  type: CREATE_BOOKMARK,
  payload
})

const deleteBookmark = (id) => ({
  type: DELETE_BOOKMARK,
  id
})

export const getUsersBookmark = () => async dispatch => {
  const res = await fetch(`/api/bookmarks/`)
  if (res.ok) {
    const bookmarks = await res.json()
    dispatch(getBookmarks(bookmarks))
    return bookmarks
  }
  return res
}

// export const getOneEvent = (id) => async dispatch => {
//   const res = await fetch(`/api/events/${id}`)

//   if (res.ok) {
//     const oneEvent = await res.json()
//     dispatch(getOneEventThunk(oneEvent))
//     return oneEvent
//   }

// }

export const createNewBookmark = (payload) => async dispatch => {

  const res = await fetch('/api/bookmarks/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    const data = await res.json();

    await dispatch(createBookmark(data))
    return data
  }
}

// export const updateEvent = (payload, id) => async dispatch => {
//   const res = await fetch(`/api/events/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   })

//   if (res.ok) {
//     const data = await res.json();

//     await dispatch(update(data, id))
//     return data;
//   }
// }

export const deleteUsersBookmark = (id) => async dispatch => {
  const res = await fetch(`/api/bookmarks/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    await res.json();
    dispatch(deleteBookmark(id))
    return res
  }
}


const initialState = {

};

export default function bookmarksReducer(state = initialState, action) {
  // const newState = { ...state }
  switch (action.type) {
    case GET_BOOKMARKS: {
      return { ...action.bookmarks }
    }
    case CREATE_BOOKMARK: {
      const newState = { ...state }

      return newState
    }
    // case UPDATE_ONE: {
    //   //DOESNT WORK
    //   let updatedState = { ...state }
    //   updatedState[action.id] = action.payload
    //   return updatedState
    // }
    case DELETE_BOOKMARK: {
      let afterState = { ...state }

      delete afterState[action.id]
      return afterState
    }
    // case GET_ONE: {
    //   return { ...state }
    // }
    default:
      return state;
  }
}
