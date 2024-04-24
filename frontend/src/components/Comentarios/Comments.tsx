export const Comments = () => {
	return (
		<div className='flex mt-5'>
			<div className='w-10 h-10 shadow m-3'>
				<img
					className='w-10 h-10 left-0 top-0 object-cover rounded-50p'
					src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
				/>
			</div>
			<div className='w-full flex flex-col justify-center'>
				<div className='w-96 bg-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col justify-start items-center'>
					<div className='w-96 text-gray-50 p-2 text-xs font-normal font-Nunito leading-normal ml-4 '>
						Me parece muy interesante este artículo.
					</div>
					<p className='w-[90%] text-xs font-normal text-gray-50 text-right'>
						3 me gusta
					</p>
				</div>
			</div>
		</div>
	);
};
