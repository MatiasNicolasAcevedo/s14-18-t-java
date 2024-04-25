import { toast } from 'react-toastify';
import { useStore } from './useStore';
import { setUser, update } from '@/store/users/slice';
import { UpdateUserDTO, User } from '@/types/user';
import { updateUserService } from '@/services';

export function useUser() {
	const { appSelector, appDispatch } = useStore();
	const user = appSelector(state => state.user);
	const token = appSelector(state => state.token);
	const dispatch = appDispatch();

	const saveUser = (data: User) => dispatch(setUser(data));

	const updateUser = async (dto: UpdateUserDTO) => {
		try {
			const { data, message } = await toast.promise(
				updateUserService(user.idUser, dto, token),
				{
					pending: 'Enviando...',
					success: 'Datos actualizados',
					error: 'Error en el Servidor',
				},
			);
			if (message != null) return toast.error(message);
			dispatch(update(data));
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	return { user, saveUser, updateUser };
}
