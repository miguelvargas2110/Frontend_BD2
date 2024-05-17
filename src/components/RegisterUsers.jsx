import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";

const RegisterUsers = ({ onRegister }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showGroupStudent, setshowGroupStudent] = useState(true);

    const password = watch("password");

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        if (selectedRole === "Estudiante") {
            setshowGroupStudent(true);
        } else {
            setshowGroupStudent(false);
        }
    };

    const onSubmitRegister = (data) => {
        onRegister(
            data.id,
            data.nombre,
            data.apellido,
            data.rol,
            data.group,
            data.email,
            data.password
        );
    };

    return (
        <div className="tab-content">
            <div className="flex w-full h-screen bg-blue-200 ">
                <div className="w-full  h-full flex items-center justify-center px-10 py-5 ">
                    <div className="max-w-[900px] px-10 py-0 rounded-3xl bg-white border-2 border-gray-100">
                        <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                            <div className="text-center mb-10">
                                <a href="#">
                                    <img
                                        src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1713754905/o72hn6qxk8r66wmgy1vd.png"
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
                                            <option value="Grupo 1">Grupo 1</option>
                                            <option value="Grupo 2">Grupo 2</option>
                                            <option value="Grupo 3">Grupo 3</option>
                                            <option value="Grupo 4">Grupo 4</option>
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
                                            id="cpassword"
                                            name="cpassword"
                                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                            placeholder="Ingresa de nuevo tu contraseña"
                                            {...register("cpassword", {
                                                required: "Por favor ingresa tu contraseña nuevamente.",
                                                validate: (value) =>
                                                    value === password || "Las contraseñas no coinciden.",
                                            })}
                                        />
                                        {errors.cpassword && (
                                            <p className="text-red-500">{errors.cpassword.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="!mt-10">
                                    <button
                                        type="submit"
                                        className=" btn btn-primary h-50% w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                                    >
                                        Registrarse
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUsers;
