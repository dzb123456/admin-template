import { createSlice } from '@reduxjs/toolkit';

export const user =  createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('user-token')
    },
    reducers: {
        setToken(state, { payload }){
            sessionStorage.setItem('user-token', payload.token);
        }
    }
})

export default user.reducer;
