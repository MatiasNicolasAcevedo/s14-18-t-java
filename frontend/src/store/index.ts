import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './token/slice';
import roulleteReducer from './roullete/slice';
import userReducer from './users/slice';

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		roullete: roulleteReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
