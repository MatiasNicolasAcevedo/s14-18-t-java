import { useStore } from './useStore';
import { setUser } from '@/store/users/slice';
import { User } from '@/types/user';

export function useUser() {
	const { appSelector, appDispatch } = useStore();
	const user = appSelector(state => state.user);
	const dispatch = appDispatch();

	const saveUser = (data: User) => dispatch(setUser(data));

	return { user, saveUser };
}
