import { configureStore } from '@reduxjs/toolkit'
import userNameReducer from './slices/username.js'
import gameStateReducer from './slices/gameState.js'
import leaderboardReducer from './slices/leaderboard.js'
import scoreReducer from './slices/score.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    username: userNameReducer,
    gameState: gameStateReducer,
    leaderboard: leaderboardReducer,
    score: scoreReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().prepend(socketMiddleWare)
})

export const persistor = persistStore(store);
