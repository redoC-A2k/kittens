import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const gameStateSlice = createSlice({
    name:'gameState',
    initialState:{
        cards:[],
        diffuseCards:[],
    },
    reducers:{
        set:(state,action) => {
            if(action.payload.cards)
            state.cards = action.payload.cards
            if(action.payload.diffuseCards)
            state.diffuseCards = action.payload.diffuseCards
        }
    }
})

export const { set } = gameStateSlice.actions;

// thunk

// selector
export const selectGameState = state => state.gameState

export default gameStateSlice.reducer;