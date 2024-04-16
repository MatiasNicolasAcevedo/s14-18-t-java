import { config } from '@/config';
import type { Login, Register } from '@/types/auth';

const { apiUrl } = config;

export const login = async (data: Login) => {
	const token = 'asrasr12412412';
	return token;
};

export const register = async (data: Register) => {
	await fetch(`${apiUrl}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
