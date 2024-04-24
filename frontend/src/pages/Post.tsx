import { BodyPost } from '@/components/BodyPost.tsx/BodyPost';

const Post: React.FC = () => {
	return (
		<>
			<div className='flex w-full gap-2'>
				<div className='flex flex-col gap-4'>
					<BodyPost />
				</div>
			</div>
		</>
	);
};
export default Post;
