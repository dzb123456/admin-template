import { createSlice } from '@reduxjs/toolkit';

const user =  createSlice({
    name: 'user',
    initialState: {
        token: sessionStorage.getItem('user-token')
    },
    reducers: {
        setToken(state, { payload }){
            sessionStorage.setItem('user-token', payload);
        }
    }
})

export default user.reducer;
