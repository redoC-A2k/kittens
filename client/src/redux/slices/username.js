import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
export const userNameSlice = createSlice({
    name: 'username',
    initialState: "",
    // initialState: localStorage.getItem('username') || "",
    reducers: {
        set: (state, action) => {
            localStorage.setItem('username', action.payload)
            return action.payload
        }
    }
})

export const { set } = userNameSlice.actions;

// thunk
export const fetchUser = (username) => {
    return async (dispatch,getState) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, { username })
            let user = response.data
            // TODO: Dispatch other actions for cards and diffused cards
            dispatch(set(username))
        } catch (error) {
            console.log(error)
        }
    }
}


// selector 
export const selectUserName = state => state.username

export default userNameSlice.reducer;