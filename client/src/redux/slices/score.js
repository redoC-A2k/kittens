import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const scoreSlice = createSlice({
    name: 'score',
    initialState: 0,
    reducers: {
        set: (state, action) => {
            return action.payload
        }
    }
})

export const { set } = scoreSlice.actions

// thunk
export const wonGame = (username) => {
    return async (dispatch, getState) => {
        let response = await axios.get(`${process.env.REACT_APP_BACKEND}/game/won/${username}`)
        console.log(response.data)
        dispatch(set(Number(response.data)))
    }
}

export const selectScore = state => state.score

export default scoreSlice.reducer;