import {thunk} from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import userNameReducer from './slices/username.js'

export default configureStore({
    reducer:{
        username: userNameReducer,
        // gameState:gameStateReducer,
    }
})
