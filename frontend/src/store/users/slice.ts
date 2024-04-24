import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user';

const initialState: User = {
	idUser: 0,
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	dni: '',
	age: 0,
	credits: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			const { payload } = action;
			state = payload;
			return state;
		},
	},
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
