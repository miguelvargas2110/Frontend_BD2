import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import UniqueAnswer from "./TypeQuestion/UniqueAnswer";
import MultipleAnswer from "./TypeQuestion/MultipleAnswer";
import FalseTrueAnswer from "./TypeQuestion/FalseTrueAnswer";
import MatchConcepts from "./TypeQuestion/MatchConcepts";

const Question = ({ questionId, onQuestionChange }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [question, setQuestion] = useState({
    pregunta: '',
    tipo_pregunta: 'Respuesta Unica',
    opciones: [],
    privacidad: false,
    valorPorcentaje: 0
  });

  const [options, setOptions] = useState([]);
  const prevQuestionRef = useRef(question);

  const handleOptionsChange = (updatedOptions) => {
    setOptions(updatedOptions);
  };

  const tiposPregunta = [
    "Respuesta Unica",
    "Respuesta Multiple",
    "Falso - verdadero",
    "Emparejar Conceptos",
  ];

  const [showComponentQuestion, setshowComponentQuestion] = useState(
    <UniqueAnswer onOptionsChange={handleOptionsChange} />
  );

  const handleTipoPregunta = (e) => {
    const selectedTipoPregunta = e.target.value;
    setQuestion((prev) => ({ ...prev, tipo_pregunta: selectedTipoPregunta }));
    setQuestion((prev) => ({ ...prev, opciones: []}));
    if (selectedTipoPregunta === "Respuesta Unica") {
      setshowComponentQuestion(
        <UniqueAnswer onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === "Respuesta Multiple") {
      setshowComponentQuestion(
        <MultipleAnswer onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === "Falso - verdadero") {
      setshowComponentQuestion(
        <FalseTrueAnswer onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === "Emparejar Conceptos") {
      setshowComponentQuestion(
        <MatchConcepts onOptionsChange={handleOptionsChange} />
      );
    }
  };

  const handlePreguntaChange = (e) => {
    const { value } = e.target;
    setQuestion((prev) => ({ ...prev, pregunta: value }));
  };

  const handlePrivacidadChange = (e) => {
    const { checked } = e.target;
    setQuestion((prev) => ({ ...prev, privacidad: checked }));
  };

  const handlePorcentajePregunta = (e) => {
    const { value } = e.target;
    setQuestion((prev) => ({ ...prev, valorPorcentaje: value }));
  };

  useEffect(() => {
    setQuestion((prev) => ({ ...prev, opciones: options }));
  }, [options]);

  useEffect(() => {
    const prevQuestion = prevQuestionRef.current;
    if (JSON.stringify(prevQuestion) !== JSON.stringify(question)) {
      onQuestionChange(questionId, question);
    }
    prevQuestionRef.current = question;
  }, [question, questionId, onQuestionChange]);

  const prueba = () => {
    console.log(question);
  };

  return (
    <div className="bg-gray-100 border-2 border-gray-150 p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-5">
      <div className="flex items-center mb-4">
        <select
          id="tipoPregunta"
          name="tipoPregunta"
          className="bg-white border-2 border-gray-300 w-full text-sm px-4 py-3.5 rounded-lg outline-blue-500"
          {...register("tipoPregunta", {
            required: "El tipo de la pregunta es requerido",
          })}
          onChange={handleTipoPregunta}
        >
          {tiposPregunta.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          id="valorPorcentaje"
          name="valorPorcentaje"
          placeholder="Indica el valor en porcentaje que tendra la pregunta"
          className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
          
          {...register("valorPorcentaje", {
            required: "El valor de la pregunta es requerido",
          })}
          onChange={handlePorcentajePregunta}
        />
      </div>
      <div className="mb-4">
        <textarea
          type="text"
          id="pregunta"
          name="pregunta"
          placeholder="Pregunta"
          className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
          {...register("pregunta", {
            required: "El texto de la pregunta es requerido",
          })}
          onChange={handlePreguntaChange}
        />
      </div>
      {showComponentQuestion}
      <div className="flex items-center mt-5 mb-5">
        <p className="mr-4 text-sm font-medium text-gray-900">
          Pregunta privada
        </p>
        <label className="relative cursor-pointer">
          <input
            id="privacidad"
            name="privacidad"
            type="checkbox"
            className="sr-only peer"
            onChange={handlePrivacidadChange}
          />
          <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
        </label>
      </div>
      <button
        onClick={prueba}
        className="text-red-500 hover:underline"
        type="button"
      >
        Si
      </button>
    </div>
  );
};

export default Question;
