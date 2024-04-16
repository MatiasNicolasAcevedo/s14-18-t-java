import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
//import { useAuth } from '@/hooks';

interface Errors {
	email: boolean;
	password: boolean;
}

interface Errors {
	email: boolean;
	password: boolean;
}

export function LoginForm(): JSX.Element {
	const [errors, setErrors] = useState<Errors>({
		email: false,
		password: false,
	});
	const validateForm = (email: string, password: string): boolean => {
		let validate = false;
		setErrors({
			email: false,
			password: false,
		});
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
			setErrors(prevErrors => ({
				...prevErrors,
				email: true,
			}));
			validate = true;
		}
		if (!password || !(password.length >= 5 && password.length <= 10)) {
			setErrors(prevErrors => ({
				...prevErrors,
				password: true,
			}));
			validate = true;
		}
		return validate;
	};

	const handlerOnSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (validateForm(email, password)) return;

		//	authLogin({ email, password });
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center space-y-4  bg-[#0c959526] backdrop-blur-md  p-20 w-[668px] h-[1220px]'>
				<h1 className='w-96 h-20 text-black text-4xl font-extrabold leading-9'>
					Iniciar sesión
				</h1>
				<form
					className='w-96 flex flex-col gap-6'
					onSubmit={handlerOnSubmitLogin}
				>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Correo Electrónico(*)
						</label>
						<input
							type='text'
							name='email'
							placeholder='ejemplo@gmail.com'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.email ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.email && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								❌ Ingresa un correo electrónico válido.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Contraseña(*)
						</label>
						<input
							type='password'
							name='password'
							placeholder='*************'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.password ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.password && (
							<div className='text-red-500 text-sm font-semibold ml-1'>
								❌ La contraseña debe tener entre 5 y 10 caracteres.
							</div>
						)}
					</div>
					<button
						type='submit'
						className='bg-white w-96 h-14 px-7 py-3 rounded-lg text-black text-lg shadow-custom font-bold leading-normal'
					>
						Iniciar sesión
					</button>
				</form>
				<div className='mt-4'>
					<div className='flex flex-col items-center text-white'>
						<Link to={'/register'}>Registrarse</Link>
						<Link
							to={'/reset-password'}
							className='text-white text-center font-nunito text-lg font-bold leading-9'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
