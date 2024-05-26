import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import UniqueAnswer from "./TypeQuestion/UniqueAnswer";
import MultipleAnswer from "./TypeQuestion/MultipleAnswer";
import FalseTrueAnswer from "./TypeQuestion/FalseTrueAnswer";
import MatchConcepts from "./TypeQuestion/MatchConcepts";
import tipoPregunta from "../services/tipoPreguntaService";

const Question = ({ questionId, onQuestionChange, initialData }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [question, setQuestion] = useState({
    isBanco: initialData.isBanco || false,
    pregunta: initialData.pregunta || '',
    tipo_pregunta: initialData.tipo_pregunta || 1,
    opciones: initialData.opciones || [],
    privacidad: initialData.privacidad || false,
    valorPorcentaje: initialData.valorPorcentaje || undefined,
    id: initialData.id || undefined,
  });

  const [options, setOptions] = useState(initialData.opciones || []);
  const prevQuestionRef = useRef(question);

  const handleOptionsChange = (updatedOptions) => {
    setOptions(updatedOptions);
  };

  const [tiposPregunta, setTipoPreguntas] = useState([]);

  const [showComponentQuestion, setshowComponentQuestion] = useState(
    <UniqueAnswer questionId={questionId} onOptionsChange={handleOptionsChange}  initialOptions={initialData.opciones}/>
  );

  useEffect(() => {
    const fetchTipoPregunta = async () => {
      const response = await tipoPregunta.obtenertipoPregunta();
      if (response.success) {
        setTipoPreguntas(response.message);
      }else{
        console.error('Error al obtener tipo de preguntas:', response.message);
      }
    };
    fetchTipoPregunta();
    if (initialData.tipo_pregunta === 1) {
      setshowComponentQuestion(
        <UniqueAnswer questionId={questionId} onOptionsChange={handleOptionsChange} isBanco={question.isBanco}/>
      );
    } else if (initialData.tipo_pregunta === 2) {
      setshowComponentQuestion(
        <MultipleAnswer onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={question.isBanco}/>
      );
    } else if (initialData.tipo_pregunta === 3) {
      setshowComponentQuestion(
        <FalseTrueAnswer onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={question.isBanco}/>
      );
    } else if (initialData.tipo_pregunta === 4) {
      setshowComponentQuestion(
        <MatchConcepts onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={question.isBanco}/>
      );
    }
  }, []);

  const handleTipoPregunta = (e) => {
    const selectedTipoPregunta = Number(e.target.value);
    setQuestion((prev) => ({ ...prev, tipo_pregunta: selectedTipoPregunta }));
    setQuestion((prev) => ({ ...prev, opciones: []}));
    if (selectedTipoPregunta === 1) {
      setshowComponentQuestion(
        <UniqueAnswer questionId={questionId} onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === 2) {
      setshowComponentQuestion(
        <MultipleAnswer onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === 3) {
      setshowComponentQuestion(
        <FalseTrueAnswer onOptionsChange={handleOptionsChange} />
      );
    } else if (selectedTipoPregunta === 4) {
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

  return (
    <div className="bg-gray-100 border-2 border-gray-150 p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-5">
      <div className="flex items-center mb-4">
        <select
          id="tipoPregunta"
          name="tipoPregunta"
          className="bg-white border-2 border-gray-300 w-full text-sm px-4 py-3.5 rounded-lg outline-blue-500"
          {...register("tipo_pregunta", {
            required: "El tipo de la pregunta es requerido",
          })}
          value={question.tipo_pregunta}
          onChange={handleTipoPregunta}
          disabled={question.isBanco}
        >
          {tiposPregunta.map((tipo_pregunta) => (
            <option key={tipo_pregunta[0]} value={tipo_pregunta[0]}>
              {tipo_pregunta[1]}
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
          value={question.valorPorcentaje}
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
          value={question.pregunta}
          onChange={handlePreguntaChange}
          disabled={question.isBanco}
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
            checked={question.privacidad}
            onChange={handlePrivacidadChange}
            disabled={question.isBanco}
          />
          <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
        </label>
      </div>
    </div>
  );
};

export default Question;
