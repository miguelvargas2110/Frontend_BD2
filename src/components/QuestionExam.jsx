import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import UniqueAnswer from "./TypeQuestion/UniqueAnswer";
import MultipleAnswer from "./TypeQuestion/MultipleAnswer";
import FalseTrueAnswer from "./TypeQuestion/FalseTrueAnswer";
import MatchConcepts from "./TypeQuestion/MatchConcepts";

const QuestionExam = ({ questionId, onQuestionChange, initialData }) => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [questionExam, setQuestion] = useState({
    pregunta: initialData.pregunta || '',
    tipo_pregunta: initialData.tipo_pregunta || 1,
    opciones: initialData.opciones || [],
    valorPorcentaje: initialData.valorPorcentaje || undefined,
    id: initialData.id || undefined,
  });

  const [options, setOptions] = useState(initialData.opciones || []);
  const prevQuestionRef = useRef(questionExam);

  const handleOptionsChange = (updatedOptions) => {
    setOptions(updatedOptions);
  };
  
  const [showComponentQuestion, setshowComponentQuestion] = useState();

  useEffect(() => {
    if (initialData.tipo_pregunta === 1) {
      setshowComponentQuestion(
        <UniqueAnswer readonly questionId={questionId} onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={false} isExam={true}/>
      );
    } else if (initialData.tipo_pregunta === 2) {
      setshowComponentQuestion(
        <MultipleAnswer readonly onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={false} isExam={true}/>
      );
    } else if (initialData.tipo_pregunta === 3) {
      setshowComponentQuestion(
        <FalseTrueAnswer readonly onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={false} isExam={true}/>
      );
    } else if (initialData.tipo_pregunta === 4) {
      setshowComponentQuestion(
        <MatchConcepts readonly onOptionsChange={handleOptionsChange} initialOptions={initialData.opciones} isBanco={false} isExam={true}/>
      );
    }
  }, []);

  useEffect(() => {
    setQuestion((prev) => ({ ...prev, opciones: options }));
  }, [options]);

  useEffect(() => {
    const prevQuestion = prevQuestionRef.current;
    if (JSON.stringify(prevQuestion) !== JSON.stringify(questionExam)) {
      onQuestionChange(questionId, questionExam);
    }
    prevQuestionRef.current = questionExam;
  }, [questionExam, questionId, onQuestionChange]);

  return (
    <div className="bg-gray-100 border-2 border-gray-150 p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-5">
      <div className="mb-4">
        <textarea readonly 
          type="text"
          id="pregunta"
          name="pregunta"
          placeholder="Pregunta"
          className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
          {...register("pregunta", {
            required: "El texto de la pregunta es requerido",
          })}
          value={questionExam.pregunta}
          disabled
        />
      </div>
      {showComponentQuestion}
    </div>
  );
};

export default QuestionExam;
