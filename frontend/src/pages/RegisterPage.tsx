import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
  <div className='flex flex-col items-center w-15em h-40em float-right p-10'>
      <h1 className="text-3xl font-bold mb-4">Registrarse</h1>
      <p className="w-19em h-3em overflow-hidden"> Bienvenido a Aware Gaming</p>
      <RegisterForm />
      <div className="w-full">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center">
            <div className="items-center">
              <p className="text-xs p-4">By signing up you agree to our Terms & Conditions</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p>¿Ya estás registrado?</p>
            <Link to={'/login'} className="text-blue-500">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
