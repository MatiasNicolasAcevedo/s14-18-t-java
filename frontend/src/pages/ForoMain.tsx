import { ProxCafe } from '@/components/ProxCafe/ProxCafe';
import { ProxEven } from '@/components/ProxEven/ProxEven';
import { Outlet } from 'react-router-dom';

const ForoMain: React.FC = () => {
	return (
		<>
			<div className='flex w-full gap-2'>
				<div className='flex flex-col gap-4'>
					<Outlet />
				</div>
				<div className='w-[355px] flex flex-col gap-4'>
					<ProxCafe />
					<ProxEven />
				</div>
			</div>
		</>
	);
};
export default ForoMain;
