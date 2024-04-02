import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
	return (
		<>
			<h1 className='text-3xl font-bold underline bg-green-400'>
				Hello world!
			</h1>
			<main>
				<AppRoutes />
			</main>
			<ToastContainer
				autoClose={1500}
				position='bottom-right'
			/>
		</>
	);
}

export default App;
