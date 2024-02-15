import {configureStore} from '@reduxjs/toolkit'
import userNameReducer from './slices/username.js'
import gameStateReducer from './slices/gameState.js'
import leaderboardReducer from './slices/leaderboard.js'
import scoreReducer from './slices/score.js'

export default configureStore({
    reducer:{
        username: userNameReducer,
        gameState:gameStateReducer,
        leaderboard:leaderboardReducer,
        score:scoreReducer
    }
})
