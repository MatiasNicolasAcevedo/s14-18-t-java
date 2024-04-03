import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state = action.payload;
		},
	},
});

export default tokenSlice.reducer;
export const { setToken } = tokenSlice.actions;
