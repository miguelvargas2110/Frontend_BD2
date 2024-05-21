import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateQuiz = ({ onCreateQuiz }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();  

  const [questions, setQuestions] = useState([]);

  const cantidadTotalPreguntas = watch("cantidadTotalPreguntas");

  const onSubmitCrearExamen = (data) => {
    onCreateQuiz(
      data.nombreExamen,
      data.descripcionExamen,
      data.cantidadTotalPreguntas,
      data.tiempoExamen,
      data.group,
      data.tema,
      data.cantidadPreguntasEstudiante
    );
  };

  return (
    <div className="tab-content">
      <div className="flex w-full h-full bg-blue-200 ">
        <div className="w-full  h-full flex items-center justify-center px-10 py-5 ">
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
                <h1 className="text-base font-semibold mt-5">EXAMEN</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmitCrearExamen)}>
                <div className="mb-3 mt-2">
                  <label htmlFor="nombreExamen" className="text-lg font-medium">
                    Nombre del Examen
                  </label>
                  <input
                    id="nombreExamen"
                    name="nombreExamen"
                    placeholder="Ingresa el nombre del examen"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    {...register("nombreExamen", {
                      required: "El nombre del examen es requerido",
                    })}
                  ></input>
                  {errors.nombreExamen && (
                    <p className="text-red-500">
                      {errors.nombreExamen.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-lg font-medium">
                    Descripcion del examen
                  </label>
                  <textarea
                    id="descripcionExamen"
                    name="descripcionExamen"
                    placeholder="Ingresa la Descripcion del examen"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    {...register("descripcionExamen", {
                      required: "La descripcion es requerida",
                    })}
                  ></textarea>
                  {errors.descripcionExamen && (
                    <p className="text-red-500">
                      {errors.descripcionExamen.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-lg font-medium">
                    Cantidad total de preguntas
                  </label>
                  <input
                    type="number"
                    id="cantidadTotalPreguntas"
                    name="cantidadTotalPreguntas"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Ingresa la cantidad Total de Preguntas"
                    {...register("cantidadTotalPreguntas", {
                      required: "Por favor ingrese la cantidad de preguntas.",
                      pattern: {
                        value: /^[0-9]*$/,
                        message:
                          "La cantidad de preguntas debe darse solo en números positivos.",
                      },
                    })}
                  />
                  {errors.cantidadTotalPreguntas && (
                    <p className="text-red-500">
                      {errors.cantidadTotalPreguntas.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-lg font-medium">
                    Tiempo para responder el examen
                  </label>
                  <input
                    type="text"
                    id="tiempoExamen"
                    name="tiempoExamen"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Ingresa el tiempo en minutos para responder el examen"
                    {...register("tiempoExamen", {
                      required: "Por favor ingrese el tiempo.",
                      pattern: {
                        value: /^[0-9]*$/,
                        message:
                          "La tiempo debe darse solo en números positivos.",
                      },
                    })}
                  />
                  {errors.tiempoExamen && (
                    <p className="text-red-500">
                      {errors.tiempoExamen.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
                  <label className="text-lg font-medium">Tema del Examen</label>
                  <select
                    id="tema"
                    name="tema"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    {...register("tema", {
                      required: "El tema es requerido",
                    })}
                  >
                    <option value="Triggers">Triggers</option>
                    <option value="Cursores">Cursores</option>
                    <option value="Funciones">Funciones</option>
                    <option value="Procedimiento">Procedimiento</option>
                  </select>
                  {errors.tema && (
                    <p className="text-red-500">{errors.tema.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-lg font-medium">
                    Cantidad de preguntas por Estudiante
                  </label>
                  <input
                    type="number"
                    id="cantidadPreguntasEstudiante"
                    name="cantidadPreguntasEstudiante"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Ingresa la cantidad preguntas por Estudiante"
                    {...register("cantidadPreguntasEstudiante", {
                      required: "Por favor ingrese la cantidad de preguntas.",
                      validate: (value) => {
                        const numericValue = Number(value);
                        if (isNaN(numericValue)) {
                          return "Por favor ingrese un número válido.";
                        }
                        if (numericValue > cantidadTotalPreguntas) {
                          return "La cantidad de preguntas por estudiante no puede ser mayor a la cantidad total de preguntas.";
                        }
                        if (numericValue <= 0) {
                          return "La cantidad de preguntas por estudiante no puede ser menor a 1.";
                        }
                        return true;
                      },

                      pattern: {
                        value: /^[0-9]*$/,
                        message:
                          "La cantidad de preguntas debe darse solo en números positivos.",
                      },
                    })}
                  />
                  {errors.cantidadPreguntasEstudiante && (
                    <p className="text-red-500">
                      {errors.cantidadPreguntasEstudiante.message}
                    </p>
                  )}
                </div>
                <div className="!mt-10">
                  <button
                    type="submit"
                    className=" btn btn-primary h-50% w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                  >
                    Añadir Preguntas Examen
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
export default CreateQuiz;
