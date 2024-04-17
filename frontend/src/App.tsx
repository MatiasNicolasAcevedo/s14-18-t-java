import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';

function App() {
	return (
		<>
			<main className='relative  flex m-full'>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</main>
			<ToastContainer
				autoClose={1500}
				position='bottom-right'
			/>
		</>
	);
}

export default App;
