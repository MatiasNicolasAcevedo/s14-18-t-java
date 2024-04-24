import { config } from '@/config';
import type { Login, RegisterDTO } from '@/types/auth';

const { apiUrl } = config;

export const login = async ({ email, password }: Login) => {
	const response = await fetch(`${apiUrl}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	const { data, message } = await response.json();
	if (!response.ok) return { message };
	const { token } = data;
	return { token };
};

export const register = async (dto: RegisterDTO) => {
	const response = await fetch(`${apiUrl}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});
	const { message } = await response.json();
	if (!response.ok) return { message };
	return { message: undefined };
};

export const profile = async (token: string) => {
	const response = await fetch(`${apiUrl}/api/user`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.status === 403) return { message: 'Token expirado o inválido' };
	if (!response.ok) return { message: 'Error en el Servidor' };
	const data = await response.json();
	return { data };
};
