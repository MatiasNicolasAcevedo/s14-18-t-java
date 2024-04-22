export interface Roullete {
	selectedBetType: string;
	selectedBetAmount: string;
	selectedBetNumber: string;
}

export interface PlayRoulleteDTO {
	betTypeRoulette:
		| 'WHITE'
		| 'COLOR'
		| 'EVEN'
		| 'ODD'
		| 'NUMBER'
		| 'LOWER_NUMBERS'
		| 'HIGH_NUMBERS'
		| 'FIRST_DOZEN'
		| 'SECOND_DOZEN'
		| 'THIRD_DOZEN'
		| 'FIRST_ROW'
		| 'SECOND_ROW'
		| 'THIRD_ROW';
	betAmount: 1 | 5 | 10;
	betNumber?: number;
}
