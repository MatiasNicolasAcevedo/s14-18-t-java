import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
	return (
		<>
			<div className=' bg-[#0c959526] h-full w-[668px] right-[121px] flex-col justify-center items-center backdrop-blur-md relative z-20 flex  float-right'>
				<div className='flex flex-col justify-center items-center'>
					<h1 className='text-3xl self-start font-nunito font-bold mb-4  text-black  '>
						Ingreso
					</h1>
					<LoginForm />
					<div className='w-full'>
						<div className='flex flex-col items-center'>
							<div className='flex flex-col items-center'>
								<p className=' text-center font-nunito text-base font-bold leading-9'>
									¿Aun no estás Registrado?
								</p>
								<Link
									to={'/register'}
									className='text-white text-center font-nunito text-lg font-bold leading-9'
								>
									Registrate
								</Link>
								<Link
									to={'/reset-password'}
									className='text-white text-center font-nunito text-lg font-bold leading-9'
								>
									¿Olvidaste tu contraseña?
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
