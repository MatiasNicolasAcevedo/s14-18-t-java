import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Roullete } from '@/types/roullete';

const initialState: Roullete = {
	selectedBetType: '',
	selectedBetAmount: '',
	selectedBetNumber: '',
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
	},
});

export default roulleteSlice.reducer;
export const { setSelectedBetType, setSelectedBetAmount } =
	roulleteSlice.actions;
