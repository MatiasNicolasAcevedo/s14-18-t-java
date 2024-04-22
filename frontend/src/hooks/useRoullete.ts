import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from './useStore';
import {
	setSelectedBetType,
	setSelectedBetAmount,
} from '@/store/roullete/slice';
import { playRoullete } from '@/services/roullete.services';
import { PlayRoulleteDTO, Roullete } from '@/types/roullete';

export function useRoullete() {
	const navigate = useNavigate();
	const { appSelector, appDispatch } = useStore();
	const roullete = appSelector(state => state.roullete);
	const token = appSelector(state => state.token);
	const dispatch = appDispatch();

	const setBetType = (betType: Roullete['selectedBetType']) => {
		dispatch(setSelectedBetType(betType));
	};

	const setBetAmount = (betAmount: Roullete['selectedBetAmount']) => {
		dispatch(setSelectedBetAmount(betAmount));
	};

	const bet = async () => {
		try {
			const playRoulleteDTO: PlayRoulleteDTO = {
				betTypeRoulette: (() => {
					const betTypes: {
						[key: string]: PlayRoulleteDTO['betTypeRoulette'];
					} = {
						['WHITE']: 'WHITE',
						['COLOR']: 'COLOR',
						['P A R']: 'EVEN',
						['I M P A R']: 'ODD',
						['1° 12']: 'FIRST_DOZEN',
						['2° 12']: 'SECOND_DOZEN',
						['3° 12']: 'THIRD_DOZEN',
						['1 - 18']: 'LOWER_NUMBERS',
						['19 - 36']: 'HIGH_NUMBERS',
						['C1']: 'FIRST_ROW',
						['C2']: 'SECOND_ROW',
						['C3']: 'THIRD_ROW',
					};
					return betTypes[roullete.selectedBetType] || 'NUMBER';
				})(),
				betAmount: (() => {
					const betAmounts: { [key: string]: PlayRoulleteDTO['betAmount'] } = {
						['1 crédito']: 1,
						['5 créditos']: 5,
						['10 créditos']: 10,
					};
					return betAmounts[roullete.selectedBetAmount];
				})(),
			};

			if (playRoulleteDTO.betTypeRoulette === 'NUMBER')
				playRoulleteDTO.betNumber = parseInt(roullete.selectedBetType);

			const { data, message } = await toast.promise(
				playRoullete(playRoulleteDTO, token),
				{
					pending: 'Jugando...',
					success: 'Resultado...',
					error: 'Error en el Servidor',
				},
			);
			if (message != null) {
				toast.error(message);
				navigate('/login');
				return;
			}
			alert(data.result);
		} catch (error) {
			console.log(error);
			toast.error('Error en la Aplicación');
		}
	};

	return { roullete, setBetType, setBetAmount, bet };
}
