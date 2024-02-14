import {configureStore} from '@reduxjs/toolkit'
import userNameReducer from './slices/username.js'
import gameStateReducer from './slices/gameState.js'

export default configureStore({
    reducer:{
        username: userNameReducer,
        gameState:gameStateReducer,
    }
})
