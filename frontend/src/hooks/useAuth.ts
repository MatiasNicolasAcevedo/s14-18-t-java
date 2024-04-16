import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from './useStore';
import { setToken } from '@/store/token/slice';
import { login, register } from '@/services';
import type { Login, RegisterDTO } from '@/types/auth';

export function useAuth() {
	const navigate = useNavigate();
	const { appSelector, appDispatch } = useStore();
	const token = appSelector(state => state.token);
	const dispatch = appDispatch();

	const authLogin = async (data: Login) => {
		try {
			const token: string = await toast.promise(login(data), {
				pending: 'Enviando...',
				success: 'Ingresando...',
				error: 'Error en el Servidor',
			});
			dispatch(setToken(token));
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	const authRegister = async (data: RegisterDTO) => {
		try {
			const { token } = await toast.promise(register(data), {
				pending: 'Enviando...',
				success: '¡Registro exitoso!',
				error: 'Error en el Servidor',
			});
			dispatch(setToken(token));
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	return { token, authLogin, authRegister };
}
