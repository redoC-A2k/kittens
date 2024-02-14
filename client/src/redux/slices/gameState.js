import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        cards: [],
        diffuseCards: [],
    },
    reducers: {
        set: (state, action) => {
            if (action.payload.cards)
                state.cards = action.payload.cards
            if (action.payload.diffuseCards)
                state.diffuseCards = action.payload.diffuseCards
        }
    }
})

export const { set } = gameStateSlice.actions;

// thunk
export const setGameState = (gameState, username) => {
    return async (dispatch, getState) => {
        let state = getState()
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND}/game/${username}`, {
                gameState: {
                    cards:gameState.cards===undefined?state.gameState.cards:gameState.cards,
                    diffuseCards:(gameState.diffuseCards===undefined?state.gameState.diffuseCards:gameState.diffuseCards)
                }
            })
            dispatch(set(gameState))
        } catch (error) {
            console.log(error)
        }
    }
}

// selector
export const selectGameState = state => state.gameState

export default gameStateSlice.reducer;