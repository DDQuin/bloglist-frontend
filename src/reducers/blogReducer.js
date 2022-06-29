import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        voteBlogFront(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find((a) => a.id === id)
            const changedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1,
            }
            return state.map((anecdote) =>
                anecdote.id !== id ? anecdote : changedAnecdote
            )
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const voteBlog = (id, newObject) => {
    return async (dispatch) => {
        const newAnecdote = { ...newObject, votes: newObject.votes + 1 }
        const anecdoteNew = await anecdoteService.update(id, newAnecdote)
        dispatch(voteAnecdoteFront(id))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const { voteBlogFront, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
