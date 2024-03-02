import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { set as setGameState } from './gameState'
import { set as setScore } from './score'
import toast from 'react-hot-toast'

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
            let promise = Promise.all([
                axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, { username }),
                axios.get(`${process.env.REACT_APP_BACKEND}/score/${username}`)
            ])
            toast.promise(promise, {
                loading: 'Loading',
                success: 'Enjoy game !',
                error: 'Error in logging you in',
            })
            const [gameState, score] = await promise;
            dispatch(set(username))
            dispatch(setGameState(gameState.data))
            if (score.data !== null)
                dispatch(setScore(Number(score.data)))
        } catch (error) {
            console.log(error)
        }
    }
}


// selector 
export const selectUserName = state => state.username

export default userNameSlice.reducer;