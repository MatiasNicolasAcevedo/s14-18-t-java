import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

export function useStore() {
	const appSelector: TypedUseSelectorHook<RootState> = useSelector;
	const appDispatch: () => AppDispatch = useDispatch;

	return {
		appSelector,
		appDispatch,
	};
}
