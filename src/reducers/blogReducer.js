import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        likeBlogFront(state, action) {
            const id = action.payload
            const blogToLike = state.find((a) => a.id === id)
            const changedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1,
            }
            return state.map((blog) => (blog.id !== id ? blog : changedBlog))
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlogFront(state, action) {
            const id = action.payload
            return state.filter((blog) => blog.id !== id)
        },
    },
})

export const likeBlog = (id, newObject) => {
    return async (dispatch) => {
        const newBlog = { ...newObject, likes: newObject.likes + 1 }
        const blogNew = await blogService.update(id, newBlog)
        dispatch(likeBlogFront(id))
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

export const deleteBlogBack = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlogFront(id))
    }
}

export const { likeBlogFront, appendBlog, setBlogs, deleteBlogFront } =
    blogSlice.actions
export default blogSlice.reducer
