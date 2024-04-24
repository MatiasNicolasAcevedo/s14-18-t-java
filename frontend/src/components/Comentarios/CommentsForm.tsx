const CommentsForm = () => {
	return (
		<form>
			<textarea
				placeholder='Escribe tu comentario aquí...'
				className='w-96 h-9 rounded-tl-2xl rounded-bl-2xl flex-col justify-start items-start inline-flex pl-4 align-middle'
			></textarea>
			<br />
			<button type='submit'>Enviar Comentario</button>
		</form>
	);
};

export default CommentsForm;
