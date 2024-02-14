import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { set as setGameState } from '../slices/gameState'
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
    return async (dispatch, getState) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, { username })
            // let gameState = response.data
            dispatch(set(username))
            dispatch(setGameState(response.data))
        } catch (error) {
            console.log(error)
        }
    }
}


// selector 
export const selectUserName = state => state.username

export default userNameSlice.reducer;