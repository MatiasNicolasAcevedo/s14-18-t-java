import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';
import { Footer } from './components/Footer/Footer';

function App() {
	return (
		<>
			<main className='relative  flex mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl'>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</main>

			<Footer />
			<ToastContainer
				autoClose={1500}
				position='bottom-right'
			/>
		</>
	);
}

export default App;
