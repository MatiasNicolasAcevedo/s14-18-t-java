/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state = action.payload;
			console.log('state: ', state);
		},
	},
});

export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;
