const CommentsForm = () => {
	return (
		<div className='flex w-full'>
			<div className='w-10 h-10 shadow m-1'>
				<img
					className='w-10 h-10 left-0 top-0 object-cover rounded-50p'
					src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
				/>
			</div>
			<form className='flex w-full justify-center'>
				<textarea
					placeholder='Escribe tu comentario aquí...'
					className='w-full rounded-tl-2xl rounded-bl-2xl flex-col justify-start items-start inline-flex pl-4 align-middle'
				></textarea>
				<br />
				<button
					type='submit'
					className=' bg-gray-700 rounded-tr-xl rounded-br-xl border border-gray-700 text-base px-2 text-white font-Nunito'
				>
					Comentar
				</button>
			</form>
		</div>
	);
};

export default CommentsForm;
