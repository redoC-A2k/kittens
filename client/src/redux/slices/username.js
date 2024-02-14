import { createSlice } from '@reduxjs/toolkit'
export const userNameSlice = createSlice({
    name: 'username',
    // initialState: "",
    initialState: localStorage.getItem('username') || "",
    reducers: {
        set: (state, action) => {
            localStorage.setItem('username', action.payload)
            return action.payload
        }
    }
})

export const { set } = userNameSlice.actions;

export const selectUserName = state => state.username

export default userNameSlice.reducer;