import { config } from '@/config';
import { UpdateUserDTO, User } from '@/types/user';

const { apiUrl } = config;

export const updateUserService = async (
	id: User['idUser'],
	dto: UpdateUserDTO,
	token: string,
) => {
	const response = await fetch(`${apiUrl}/api/user/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(dto),
	});
	if (response.status === 403) return { message: 'Token expirado o inválido' };
	if (!response.ok) return { message: 'Error en el Servidor' };
	const { data } = await response.json();
	return { data };
};
