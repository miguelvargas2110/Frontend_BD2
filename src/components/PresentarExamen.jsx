import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import QuestionExam from "./QuestionExam";


const PresentarExamen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formDataPregunta, setFormDataPregunta] = useState({
    preguntaTexto: "",
    privacidad: "",
    idProfesor: 0,
    idPreguntaPadre: null,
    cantidadPreguntas: 0,
    idTema: 0,
    idTipoPregunta: 0,
  });

  const [formDataOpcion, setFormDataOpcion] = useState({
    texto: "",
    respuesta: "",
    idPregunta: 0,
  });

  const [questions, setQuestions] = useState([]);
  const questionIdRef = useRef(1);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, questionData: updatedQuestion } : q))
    );
  };


  const onSubmitEnviarExamen = async (data) => {
    
  };


  return (
    <div className="tab-content">
      <div className="flex w-full h-full bg-blue-200">
        <div className="w-full h-full flex items-center justify-center px-10 py-5">
          <div
            className="w-full px-2 py-0 rounded-3xl bg-white border-2 border-gray-100"
            style={{ maxWidth: "90%" }}
          >
            <div className="mx-auto font-[sans-serif] text-[#333] p-6">
              <div className="text-center mb-10">
                <a >
                  <img
                    src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
                    alt="logo"
                    className="w-52 inline-block"
                  />
                </a>
                <h1 className="text-base font-semibold mt-5">EXAMEN</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmitEnviarExamen)}>
                <div className="!mt-5 mb-5 text-center">
                  <h1 className="text-base font-semibold mt-5">Preguntas del examen</h1>
                </div>
                {questions.map((q) => (
                  <div key={q.id}>
                    <QuestionExam
                      key={q.id}
                      questionId={q.id}
                      onQuestionChange={handleQuestionChange}
                      initialData={q.questionData}
                    />
                    
                  </div>
                ))}
                <div className="mt-10">
                  <button
                    type="submit"
                    className="btn btn-primary h-50% w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                  >
                    Entregar examen
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


export default PresentarExamen;
