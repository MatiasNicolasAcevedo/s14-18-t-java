import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './token/slice';
import roulleteReducer from './roullete/slice';
// import UserReducer from './users/users';

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		roullete: roulleteReducer,
		// user: UserReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
