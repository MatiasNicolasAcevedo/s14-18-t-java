import { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks';
import { RegisterFormData } from '@/types/auth';
import { Link } from 'react-router-dom';

interface Errors {
	firstName: boolean;
	lastName: boolean;
	email: boolean;
	dni: boolean;
	password: boolean;
	birthDate: boolean;
}

export default function ProfileEditForm() {
	const [errors, setErrors] = useState<Errors>({
		firstName: false,
		lastName: false,
		email: false,
		dni: false,
		password: false,
		birthDate: false,
	});
	const { authRegister } = useAuth();

	function calculateAge(birthDate: Date): number {
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	const validateForm = ({
		firstName,
		lastName,
		email,
		dni,
		password,
		birthDate,
	}: RegisterFormData): boolean => {
		let validate = false;
		setErrors({
			firstName: false,
			lastName: false,
			email: false,
			dni: false,
			password: false,
			birthDate: false,
		});
		if (!firstName || firstName.length <= 3) {
			setErrors(prevErrors => ({
				...prevErrors,
				firstName: true,
			}));
			validate = true;
		}
		if (!lastName || lastName.length <= 3) {
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
		if (!birthDate) {
			setErrors(prevErrors => ({
				...prevErrors,
				birthDate: true,
			}));
			validate = true;
		}
		return validate;
	};

	const handleSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const dni = formData.get('dni') as string;
		const password = formData.get('password') as string;
		const birthDateString = formData.get('birthDate') as string;
		const birthDate = new Date(birthDateString); // Convertir la cadena a un objeto Date
		const birthDateStringISO = birthDate.toISOString(); // Convertir el objeto Date a una cadena

		if (
			validateForm({
				firstName,
				lastName,
				email,
				dni,
				password,
				birthDate: birthDateStringISO,
			})
		)
			return;

		authRegister({
			firstName,
			lastName,
			email,
			dni,
			password,
			birthDate: new Date(birthDateStringISO),
			age: calculateAge(new Date(birthDateStringISO)),
		});
	};

	return (
		<>
			<div className='flex flex-col w-1/2 items-center space-y-2 justify-centerbg  bg-teal-600 bg-opacity-20 rounded-[20px] backdrop-blur p-5 '>
				<div className='w-full text-left'>
					<p className='text-gray-900 text-xl font-bold font-nunito leading-normal font-base '>
						Perfil
					</p>
				</div>
				<form
					className='w-3/4 flex flex-col gap-6'
					onSubmit={handleSubmitRegister}
				>
					<div className='w-full flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='firstName'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Nombre(*)
						</label>
						<input
							id='firstName'
							type='text'
							name='firstName'
							placeholder='Juan Martín'
							className={`bg-white shadow-custom-inner rounded-lg pl-5 pr-4 border-none py-3 w-full text-black ${
								errors.firstName
									? 'border-red-500 border-[3px]'
									: 'border border-black'
							}`}
						/>
						{errors.firstName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu nombre debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className='w-full flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='lastName'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Apellido(*)
						</label>
						<input
							id='lastName'
							type='text'
							name='lastName'
							placeholder='Gonzalez'
							className={`bg-white shadow-custom-inner border-none rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.lastName ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.lastName && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Tu apellido debe tener al menos 3 caracteres.
							</div>
						)}
					</div>
					<div className='w-full flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='DNI'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							DNI(*)
						</label>
						<input
							id='DNI'
							type='number'
							name='dni'
							placeholder='12345678'
							step='1'
							className={`bg-white shadow-custom-inner border-none rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.dni ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.dni && (
							<div className='text-gray-900 text-sm font-bold font-nunito leading-normal'>
								❌ Ingresa tu DNI.
							</div>
						)}
					</div>
					<div className='w-full flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='password'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Contraseña(*)
						</label>
						<input
							id='password'
							type='password'
							name='password'
							placeholder='*************'
							className={`bg-white  border-none shadow-custom-inner rounded-lg pl-5 pr-4 py-3 w-full text-black ${errors.password ? 'border-red-500 border-[3px]' : 'border border-black'}`}
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
					<div className='w-full flex-col justify-start items-start gap-1 inline-flex'>
						<label
							htmlFor='birthDate'
							className='text-gray-900 text-sm font-bold font-nunito leading-normal'
						>
							Fecha de nacimiento(*)
						</label>
						<input
							id='birthDate'
							type='date'
							name='birthDate'
							className={`bg-white shadow-custom-inner border-none   rounded-lg pl-5 pr-4 py-3 w-full text-gray-900 ${errors.birthDate ? 'border-red-500 border-[3px]' : 'border border-black'}`}
						/>
						{errors.birthDate && (
							<div className='text-black text-sm font-semibold ml-1'>
								❌ Debes ser mayor de 18 años.
							</div>
						)}
					</div>

					<div className='flex justify-around flex-end w-full'>
						<button
							type='submit'
							className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2'
						>
							<div className='text-gray-800 text-sm font-bold font-Nunito leading-tight'>
								Editar
							</div>
						</button>
						<button
							type='button'
							className='w-[86px] h-8 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 flex justify-center items-center gap-2'
						>
							<Link
								to='/dashboard/profile'
								className='text-gray-800 text-sm font-bold font-Nunito leading-tight'
							>
								Cancelar
							</Link>
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
