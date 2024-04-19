/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const TOKEN_KEY = 'token_awaregaming_v1';

const initialState: string = localStorage.getItem(TOKEN_KEY) ?? '';

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state = payload;
			localStorage.setItem(TOKEN_KEY, payload);
			return state;
		},
	},
});

export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;
