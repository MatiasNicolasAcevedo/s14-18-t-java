import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateUserDTO, User } from '@/types/user';

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
		update: (state, action: PayloadAction<UpdateUserDTO>) => {
			const { payload } = action;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.password = payload.password;
			state.dni = payload.dni;
			return state;
		},
		setNewCredit: (state, action: PayloadAction<User['credits']>) => {
			const { payload } = action;
			state.credits = payload;
			return state;
		},
		removeUser: state => {
			state = initialState;
			return state;
		},
	},
});

export default userSlice.reducer;
export const { setUser, update, setNewCredit, removeUser } = userSlice.actions;
