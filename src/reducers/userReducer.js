import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const loginUser = (userObject) => {
    return async (dispatch) => {
        const user = await loginService.login(userObject)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const logoutUserBack = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }
}

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
