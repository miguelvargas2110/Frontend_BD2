import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import loginUser from "../services/usuarioLoginService";

const LoginForm = ({ onLogin, navigateToRegister }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });

  const onSubmitLogin = async (data) => {
    formData.correo = data.loginEmail;
    formData.contrasena = data.loginPassword;

    try {
      const response = await loginUser(formData);
      if (response.success) {
        onLogin();
      } else {
        Swal.fire({
          icon: "error",
          text: response.message
        });
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      Swal.fire({
        icon: "error",
        text: 'Error al registrarse'
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-6 py-12 lg:px-8 bg-gray-200 justify-items-center">
      <div className="w-[500px] px-10 py-10 rounded-3xl bg-white border-2 border-gray-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bienvenido
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <input
                type="text"
                id="loginEmail"
                name="email"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter your email"
                {...register("loginEmail", {
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "El correo debe ser valido",
                  },
                })}
              />
              {errors.loginEmail && (
                <p className="text-red-500">{errors.loginEmail.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-4 mb-8">
              <label className="text-lg font-medium">Contraseña</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Ingresa tu contraseña"
                {...register("loginPassword", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.loginPassword && (
                <p className="text-red-500">{errors.loginPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingresar
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={navigateToRegister}
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
