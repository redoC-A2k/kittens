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
// export const getLeaderBoard = () => {
//     return async (dispatch) => {
//         let response = await axios.get(`${process.env.REACT_APP_BACKEND}/leaderboard`)
//         dispatch(set(response.data))
//     }
// }

export const selectLeaderBoard = state => state.leaderboard

export default leaderboardSlice.reducer;