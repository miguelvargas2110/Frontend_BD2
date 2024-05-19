import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UniqueAnser from "./TypeQuestion/UniqueAnswer";
import UniqueAnswer from "./TypeQuestion/UniqueAnswer";
import MultipleAnswer from "./TypeQuestion/MultipleAnswer";
import FalseTrueAnswer from "./TypeQuestion/FalseTrueAnswer";

const Question = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const opciones = [
    "Respuesta Unica",
    "Respuesta Multiple",
    "Falso - verdadero",
    "Emparejar Conceptos",
    "Ordenar Conceptos"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        <select
          id="tipoPregunta"
          name="tipoPregunta"
          className="bg-white border-2 border-gray-300 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
          {...register("tipoPregunta", {
            required: "El tipo de la pregunta es requerido",
          })}
        >
          {opciones.map((opcion, index) => (
          <option key={index} value={opcion}>{opcion}</option>
        ))}

        </select>
      </div>
      <div className="mb-4">
        <textarea
          type="text"
          id="pregunta"
          name="pregunta"
          placeholder="Pregunta"
          className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-md"
          {...register("pregunta", {
            required: "El texto de la pregunta es requerido",
          })}
        />
      </div>
      <UniqueAnswer/>
      <MultipleAnswer/>
      <FalseTrueAnswer/>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 6.707a1 1 0 00-1.414 0L10 12.586 4.121 6.707a1 1 0 00-1.414 1.414l6.293 6.293a1 1 0 001.414 0l6.293-6.293a1 1 0 000-1.414z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zm1 4a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zM4 8a1 1 0 100 2h12a1 1 0 100-2H4zm-1 4a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zm-2 4a1 1 0 100 2h16a1 1 0 100-2H1z" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v12a1 1 0 102 0V3a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v12a1 1 0 102 0V3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Obligatoria</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Question;
