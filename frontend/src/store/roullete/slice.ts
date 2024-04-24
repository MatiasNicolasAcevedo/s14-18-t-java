import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Roullete } from '@/types/roullete';

const initialState: Roullete = {
	selectedBetType: '',
	selectedBetAmount: '',
	selectedBetNumber: '',
	result: '',
	winningNumber: '',
	winningAmount: 0,
	numberColor: '',
};

export const roulleteSlice = createSlice({
	name: 'roullete',
	initialState,
	reducers: {
		setSelectedBetType: (
			state,
			action: PayloadAction<Roullete['selectedBetType']>,
		) => {
			const { payload } = action;
			state.selectedBetType = payload;
			return state;
		},
		setSelectedBetAmount: (
			state,
			action: PayloadAction<Roullete['selectedBetAmount']>,
		) => {
			const { payload } = action;
			state.selectedBetAmount = payload;
			return state;
		},
		setResult: (
			state,
			action: PayloadAction<{
				result: Roullete['result'];
				winningNumber: Roullete['winningNumber'];
				winningAmount: Roullete['winningAmount'];
				numberColor: Roullete['numberColor'];
			}>,
		) => {
			const { payload } = action;
			state.result = payload.result;
			state.winningNumber = payload.winningNumber;
			state.winningAmount = payload.winningAmount;
			state.numberColor = payload.numberColor;
			return state;
		},
		reset: state => {
			state = initialState;
			return state;
		},
	},
});

export default roulleteSlice.reducer;
export const { setSelectedBetType, setSelectedBetAmount, setResult, reset } =
	roulleteSlice.actions;
