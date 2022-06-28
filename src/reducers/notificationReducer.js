import { createSlice } from '@reduxjs/toolkit'

const initialState = []
let timeID = -1

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotificationFront(state, action) {
        const content = action.payload
        state.push(content)
      },

      removeNotification(state, action) {
        state.pop()
      },

    },
  })

  export const setNotification = (message, seconds) => {
    return async dispatch => {
     dispatch(removeNotification())
     clearTimeout(timeID)
      timeID = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
    dispatch(setNotificationFront(message))
    }
    
  }
  
  export const { setNotificationFront, removeNotification } = notificationSlice.actions
  export default notificationSlice.reducer
