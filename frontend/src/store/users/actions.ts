import { Dispatch } from 'redux';
import {
	USER_SIGNIN_REQUEST,
	/*USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNOUT,*/
	USER_REGISTER_REQUEST,
} from './constants';

export const register =
	(name: string, email: string, password: string, dateOfBirth: string) =>
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

export const login =
	(email: string, password: string) => async (dispatch: Dispatch) => {
		dispatch({
			type: USER_SIGNIN_REQUEST,
			payload: { email, password },
		});
		/*
		try {
			// const response = await fetch(`${URL}/login`, { method: 'POST', body: JSON.stringify({ email, password }) });
			// const data = await response.json();

			// Si la solicitud es exitosa, despacha la acción USER_LOGIN_SUCCESS.
			dispatch({
				type: USER_SIGNIN_SUCCESS,
				payload: data, // Poner los datos del usuario que devuelve el servidor.
			});
		} catch (error) {
			// Si la solicitud falla, despacha la acción USER_LOGIN_FAIL.
			dispatch({
				type: USER_SIGNIN_FAIL,
				payload: error.message, // Aquí deberías poner el mensaje de error que devuelve el servidor.
			});
		}
		*/
	};
