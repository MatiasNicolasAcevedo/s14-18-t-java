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
			const { token, message }: { token?: string; message?: string } =
				await toast.promise(login(data), {
					pending: 'Enviando...',
					success: 'Ingresando...',
					error: 'Error en el Servidor',
				});
			if (message != null) return toast.error(message);
			if (token) dispatch(setToken(token));
			navigate('/dashboard/profile');
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	const authRegister = async (data: RegisterDTO) => {
		try {
			const { message }: { message?: string } = await toast.promise(
				register(data),
				{
					pending: 'Enviando...',
					success: '¡Registro exitoso!',
					error: 'Error en el Servidor',
				},
			);
			if (message != null) return toast.error(message);
			const { email, password } = data;
			authLogin({ email, password });
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	return { token, authLogin, authRegister };
}
