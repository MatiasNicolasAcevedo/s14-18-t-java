import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './token/slice';
// import UserReducer from './users/users';

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		// user: UserReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
