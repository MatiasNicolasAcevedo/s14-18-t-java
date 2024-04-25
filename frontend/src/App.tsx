import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<main className='relative h-screen w-screen  flex  '>
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
