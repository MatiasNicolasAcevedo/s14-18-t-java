import { PayloadAction } from '@reduxjs/toolkit';
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from './constants';

/* ========================* INITIAL STATE *======================== */
interface UserState {
	loading: boolean;
	userInfo: null;
	error: string | null;
}

const initialState: UserState = {
	loading: false,
	userInfo: null,
	error: null,
};

const UserReducer = (
	state = initialState,
	action: PayloadAction<string>,
): UserState => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true, error: null };
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				// userInfo: action.payload,
				error: null,
			};
		case USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default UserReducer;
