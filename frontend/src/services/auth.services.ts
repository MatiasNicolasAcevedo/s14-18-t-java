/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from '@/config';
import type { Login, RegisterDTO } from '@/types/auth';

const { apiUrl } = config;

export const login = async (_data: Login) => {
	const token = 'asrasr12412412';
	return token;
};

export const register = async (data: RegisterDTO) => {
	const response = await fetch(`${apiUrl}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) return;
	const responseData = await response.json();
	return responseData;
};
