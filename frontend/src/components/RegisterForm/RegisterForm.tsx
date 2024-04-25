import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { RegisterFormData } from '@/types/auth';

interface Errors {
	firstName: boolean;
	lastName: boolean;
	email: boolean;
	dni: boolean;
	password: boolean;
	birthDate: boolean;
	repearPassword: boolean;
	accepted: boolean;
}

export function RegisterForm() {
	const [errors, setErrors] = useState<Errors>({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		dni: false,
		birthDate: false,
		repearPassword: false,
		accepted: false,
	});
	const { authRegister } = useAuth();

	const validateForm = ({
		firstName,
		lastName,
		email,
		dni,
		password,
		repeatPassword,
		birthDate,
		accepted,
	}: RegisterFormData): boolean => {
		let validate = false;
		setErrors({
			firstName: false,
			lastName: false,
			email: false,
			dni: false,
			password: false,
			birthDate: false,
			repearPassword: false,
			accepted: false,
		});
		if (!firstName || firstName?.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: true,
			}));
			validate = true;
		}
		if (!lastName || lastName?.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				lastName: true,
			}));
			validate = true;
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
			setErrors(prevErrors => ({
				...prevErrors,
				email: true,
			}));
			validate = true;
		}
		if (!dni) {
			setErrors(prevErrors => ({
				...prevErrors,
				dni: true,
			}));
			validate = true;
		}
		if (
			!password ||
			!/[A-Z]/.test(password) ||
			!/\d/.test(password) ||
			!(password.length >= 5 && password.length <= 10)
		) {
			setErrors(prevErrors => ({
				...prevErrors,
				password: true,
			}));
			validate = true;
		}
		if (!repeatPassword || !(password === repeatPassword)) {
			setErrors(prevErrors => ({
				...prevErrors,
				repearPassword: true,
			}));
			validate = true;
		}
		if (!birthDate) {
			setErrors(prevErrors => ({
				...prevErrors,
				birthDate: true,
			}));
			validate = true;
		} else {
			const currentDate = new Date();
			const birth = new Date(birthDate);
			const limitDate = new Date(
				currentDate.getFullYear() - 18,
				currentDate.getMonth(),
				currentDate.getDate(),
			);
			setErrors(prevErrors => ({
				...prevErrors,
				birthDate: birth > limitDate,
			}));
			validate = birth > limitDate;
		}
		if (!accepted) {
			setErrors(prevErrors => ({
				...prevErrors,
				accepted: true,
			}));
			validate = true;
		}
		return validate;
	};

	const handlerOnSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const dni = formData.get('dni') as string;
		const password = formData.get('password') as string;
		const repeatPassword = formData.get('repeatPassword') as string;
		const birthDate = formData.get('birthDate') as string;
		const accepted = formData.get('accepted') as string;

		if (
			validateForm({
				firstName,
				lastName,
				email,
				dni,
				password,
				repeatPassword,
				birthDate,
				accepted,
			})
		)
			return;
		const currentDate = new Date();
		const birth = new Date(birthDate);
		authRegister({
			firstName,
			lastName,
			email,
			dni,
			password,
			age: currentDate.getFullYear() - birth.getFullYear(),
		});
	};

	return (
		<>
			<div className='flex flex-col items-center  justify-center bg-opacity-20 border   bg-[#0c959526] backdrop-blur-md  p-20 '>
				<h1 className='w-96 h-20 text-black text-4xl font-extrabold leading-9'>
					Registro
				</h1>
				<form
					className='w-96 flex flex-col gap-6'
					onSubmit={handlerOnSubmitRegister}
				>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Nombre(*)
						</label>
						<input
							type='text'
							name='firstName'
							placeholder='María'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.firstName ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.firstName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu nombre debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Apellido(*)
						</label>
						<input
							type='text'
							name='lastName'
							placeholder='Gonzalez'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.lastName ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.lastName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu apellido debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
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
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Ingresa un correo electrónico válido.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							DNI(*)
						</label>
						<input
							type='number'
							name='dni'
							placeholder='12345678'
							step='1'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.dni ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.dni && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Ingresa tu DNI.
							</div>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Fecha de nacimiento(*)
						</label>
						<input
							type='date'
							name='birthDate'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.birthDate ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.birthDate && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Debes ser mayor de 18 años.
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
							<span>
								<ul className='text-black text-sm font-semibold ml-1'>
									<li>❌ La contraseña debe contener:</li>
									<li className='pl-6'>Una letra mayúscula.</li>
									<li className='pl-6'>Un número.</li>
									<li className='pl-6'>Entre 5 y 10 caracteres.</li>
								</ul>
							</span>
						)}
					</div>
					<div className='w-96 flex-col justify-start items-start gap-1 inline-flex'>
						<label className='text-black text-sm font-semibold leading-normal'>
							Repetir Contraseña(*)
						</label>
						<input
							type='password'
							name='repeatPassword'
							placeholder='*************'
							className={`bg-white rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.repearPassword ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.repearPassword && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Las contraseñas no coinciden.
							</div>
						)}
					</div>
					<div className='flex flex-col justify-center items-center'>
						<div className='w-96 h-7 text-black text-base font-bold leading-9 flex gap-2 justify-center items-center'>
							<input
								type='checkbox'
								name='accepted'
							/>
							<label>Acepto Términos y Condiciones</label>
						</div>
						{errors.accepted && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Debes aceptar los Términos y Condiciones.
							</div>
						)}
					</div>
					<button
						type='submit'
						className='bg-white w-96 h-14 px-7 py-3 rounded-lg text-black text-lg shadow-custom font-bold leading-normal'
					>
						Registrarse
					</button>
				</form>
				<div className='mt-4'>
					<div className='flex flex-col items-center text-black'>
						<Link to={'/login'}>Iniciar sesión</Link>
					</div>
				</div>
			</div>
		</>
	);
}
