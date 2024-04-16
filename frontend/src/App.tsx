import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from '@/routes/AppRoutes';
import Navbar from './components/NavBar/NavBar';

function App() {
	return (
		<>
			<main>
				<Navbar/>
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
