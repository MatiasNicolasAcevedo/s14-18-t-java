import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
	return (
		<>
			<div className=' bg-[#0c959526] h-full w-[668px] right-[121px] backdrop-blur-md relative z-20 flex  float-right'>
				<div className='flex flex-col justify-center items-center'>
					<h1 className='text-3xl font-bold mb-4 '>Ingreso</h1>
					<p className='w-19em h-3em overflow-hidden'>
						Bienvenido a Aware Gaming
					</p>
					<LoginForm />
					<div className='w-full'>
						<div className='flex flex-col items-center'>
							<div className='w-full flex items-center'>
								<div className='items-center'>
									<p className='text-xs p-4'>
										By signing up you agree to our Terms & Conditions
									</p>
								</div>
							</div>
							<div className='flex flex-col items-center'>
								<p>¿Aun no estás Registrado?</p>
								<Link
									to={'/register'}
									className='text-blue-500'
								>
									Registrate
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
