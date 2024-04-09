import { Dispatch } from 'redux';
import {
	USER_SIGNIN_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from './constants';

const URL = ''; //FALTA URL BACK

export const register =
	(
		name: string,
		lastname: string,
		email: string,
		password: string,
		dateOfBirth: string,
	) =>
	async (dispatch: Dispatch) => {
		dispatch({
			type: USER_REGISTER_REQUEST,
			payload: { name, email, password, dateOfBirth },
		});
		// try {
		//   const { data } = await Axios.post(`${URL}/register`, {  //FALTA ENDPOINT
		//     name,
		//     email,
		//     password,
		//     lastname,
		//     dateOfBirth
		//   });
		//   dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		//   dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		//   localStorage.setItem("userInfo", JSON.stringify(data));
		// } catch (error:any) {
		//   dispatch({
		//     type: USER_REGISTER_FAIL,
		//     payload:
		//       error.response && error.response.data.message
		//         ? error.response.data.message
		//         : error.message,
		//   });
		// }
	};
