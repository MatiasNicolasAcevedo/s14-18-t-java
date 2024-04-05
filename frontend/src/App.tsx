import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<>
		<LandingPage/>
			<main>
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
