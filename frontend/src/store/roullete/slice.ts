import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Roullete } from '@/types/roullete';

const initialState: Roullete = {
	selectedBetType: '',
	selectedBetAmount: '',
	selectedBetNumber: '',
	result: '',
	winningNumber: '',
};

export const roulleteSlice = createSlice({
	name: 'roullete',
	initialState,
	reducers: {
		setSelectedBetType: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.selectedBetType = payload;
			return state;
		},
		setSelectedBetAmount: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			state.selectedBetAmount = payload;
			return state;
		},
		setResult: (
			state,
			action: PayloadAction<{ result: string; winningNumber: string }>,
		) => {
			const { payload } = action;
			state.result = payload.result;
			state.winningNumber = payload.winningNumber;
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
