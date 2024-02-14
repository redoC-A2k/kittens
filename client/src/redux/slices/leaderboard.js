import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: [],
    reducers: {
        set: (state, action) => {
            return action.payload
        },
    }
})

export const { set } = leaderboardSlice.actions;

// thunk
export const wonGame = (username) => {
    return async (dispatch, getState) => {
        let resposne = axios.get(`${process.env.REACT_APP_BACKEND}/leaderboard/${username}`)
        console.log(response)
        // dispatch(set(resposne.data))
    }
}

export const selectLeaderBoard = state => state.leaderboard

export default leaderboardSlice.reducer;
