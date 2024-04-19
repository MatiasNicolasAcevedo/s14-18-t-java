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
