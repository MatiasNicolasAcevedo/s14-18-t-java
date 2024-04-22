import { config } from '@/config';
import { PlayRoulleteDTO } from '@/types/roullete';

const { apiUrl } = config;

export const playRoullete = async (dto: PlayRoulleteDTO, token: string) => {
	const response = await fetch(`${apiUrl}/api/game/play-roulette`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(dto),
	});
	if (response.status === 403) return { message: 'Token expirado o inválido' };
	if (!response.ok) return { message: 'Error en el Servidor' };
	const data = await response.json();
	return { data };
};
