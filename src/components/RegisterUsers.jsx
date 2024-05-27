import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import registerUser from "../services/usuarioRegisterService";
import grupoServices from "../services/gruposService";

const RegisterUsers = ({ onRegister, navigateToLogin }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showGroupStudent, setshowGroupStudent] = useState(true);
    const [grupos, setGrupos] = useState([]); // Inicializa grupos como un array vacío

    const password = watch("password");

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        if (selectedRole === "Estudiante") {
            setshowGroupStudent(true);
        } else {
            setshowGroupStudent(false);
        }
    };

    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        rol: '',
        grupoId: ''
    });

    useEffect(() => {
        const fetchGrupos = async () => {
            const response = await grupoServices.obtenerGrupos();
            if (response.success) {
                setGrupos(response.message); // Asigna los grupos al estado
            } else {
                console.error('Error al obtener grupos:', response.message);
            }
        };
        fetchGrupos();
    }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al montar el componente

    const onSubmitRegister = async (data) => {
        formData.id = data.id;
        formData.nombre = data.nombre;
        formData.apellido = data.apellido;
        formData.correo = data.email;
        formData.contrasena = data.password;
        formData.rol = data.rol;
        formData.grupoId = data.group; // Asigna el grupo seleccionado

        try {
            const registerSuccess = await registerUser(formData);

            if (registerSuccess.success) {
                Swal.fire({
                    icon: "success",
                    title: "El usuario con cedula " + formData.id + " ha sido registrado correctamente",
                    showConfirmButton: false,
                    timer: 5000
                });
                onRegister();
            } else {
                Swal.fire({
                    icon: "error",
                    text: registerSuccess.message
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
        console.log(grupos),
        <div className="tab-content">
            <div className="flex w-full h-screen bg-blue-200 ">
                <div className="w-full h-full flex items-center justify-center px-10 py-5 ">
                    <div className="max-w-[900px] px-10 py-0 rounded-3xl bg-white border-2 border-gray-100">
                        <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                            <div className="text-center mb-10">
                                <a href="#">
                                    <img
                                        src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
                                        alt="logo"
                                        className="w-52 inline-block"
                                    />
                                </a>
                                <h4 className="text-base font-semibold mt-5">
                                    REGISTRAR USUARIO
                                </h4>
                            </div>
                            <form onSubmit={handleSubmit(onSubmitRegister)}>
                                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 mt-3">
                                    <div>
                                        <label htmlFor="rol" className="text-lg font-medium">
                                            Rol
                                        </label>
                                        <select
                                            id="rol"
                                            name="rol"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            {...register("rol", {
                                                required: "El rol es requerido",
                                            })}
                                            onChange={handleRoleChange}
                                        >
                                            <option value="Estudiante">Estudiante</option>
                                            <option value="Profesor">Profesor</option>
                                            <option value="Coordinador">Coordinador</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                        {errors.rol && (
                                            <p className="text-red-500">{errors.rol.message}</p>
                                        )}
                                    </div>
                                    {showGroupStudent && (
                                        <div>
                                            <label className="text-lg font-medium">
                                                Grupo del Estudiante
                                            </label>
                                            <select
                                                id="group"
                                                name="group"
                                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                                {...register("group", {
                                                    required: "El grupo es requerido",
                                                })}
                                            >
                                                {grupos.map((grupo) => (
                                                    <option key={grupo[0]} value={grupo[0]}>
                                                        {grupo[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.group && (
                                                <p className="text-red-500">{errors.group.message}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 mt-3">
                                    <div>
                                        <label className="text-lg font-medium">Nombres</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa tu nombre"
                                            {...register("nombre", { required: true })}
                                        />
                                        {errors.nombre && (
                                            <p className="text-red-500">
                                                Por favor ingresa tu nombre.
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-lg font-medium">Apellidos</label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa tu apellidos"
                                            {...register("apellido", { required: true })}
                                        />
                                        {errors.apellido && (
                                            <p className="text-red-500">
                                                Por favor ingresa tus apellidos.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 mt-3">
                                    <div>
                                        <label className="text-lg font-medium">Cedula</label>
                                        <input
                                            type="text"
                                            id="id"
                                            name="id"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa tu cedula"
                                            {...register("id", {
                                                required: "Por favor ingresa tu cedula.",
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message: "La cedula debe contener solo números.",
                                                },
                                            })}
                                        />
                                        {errors.id && (
                                            <p className="text-red-500">{errors.id.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-lg font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa tu email"
                                            {...register("email", {
                                                required: "El correo es requerido",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "El correo debe ser valido",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 mt-3">
                                    <div>
                                        <label className="text-lg font-medium">Contraseña</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa tu contraseña"
                                            {...register("password", {
                                                required: "La contraseña es requerida",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "La contraseña debe tener al menos 8 caracteres",
                                                },
                                            })}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500">{errors.password.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-lg font-medium">
                                            Confirmar Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Confirma tu contraseña"
                                            {...register("confirmPassword", {
                                                required: "Por favor confirma tu contraseña.",
                                                validate: (value) =>
                                                    value === password || "Las contraseñas no coinciden.",
                                            })}
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-red-500">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Registrar
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6">
                                <button
                                    onClick={navigateToLogin}
                                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
                                >
                                    Volver a Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUsers;
