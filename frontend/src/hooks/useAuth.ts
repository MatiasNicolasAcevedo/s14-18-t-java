import { toast } from 'react-toastify';
import { useStore } from './useStore';
import { setToken } from '@/store/token/slice';
import { login } from '@/services';
import type { Login } from '@/types/auth';

export function useAuth() {
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

	return { token, authLogin };
}
