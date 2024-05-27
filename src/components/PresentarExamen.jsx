import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import QuestionExam from "./QuestionExam";
import examenPresentadoService from "../services/examenPresentadoService";
import Swal from "sweetalert2";
import examenService from "../services/examenService";


const PresentarExamen = (examId) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formDataPregunta, setFormDataPregunta] = useState({
    idExamenPresentado: 0,
    idPregunta: 0
  });

  const [formDataOpcion, setFormDataOpcion] = useState({
    idOpcion: 0,
    idPEP: 0
  });

  const [formDataExamen, setFormDataExamen] = useState({
    fechaPresentado: "",
    duracion: 0,
    calificacion: 0,
    horaInicio: "",
    examenesIdExamen: 0,
    estudiantesIdUsuario: 0
  });

  const [currentTime, setCurrentTime] = useState('');

  const [questions, setQuestions] = useState([]);
  const questionIdRef = useRef(1);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, questionData: updatedQuestion } : q))
    );
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await examenService.obtenerPreguntasExamen(examId.examId);
      console.log(response);
      if (response.success) {
        const newQuestions = response.message.map((question, index) => ({
          id: questionIdRef.current++,
          questionData: question,
        }));
        setQuestions(newQuestions);
      } else {
        console.error('Error al obtener preguntas:', response.message);
      }
    };
    fetchQuestions();
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  }, [examId.examId]);


  const validateQuestions = () => {
    for (const q of questions) {
      if (q.questionData.tipo_pregunta === 4) {
        for (const opcion of q.questionData.opciones) {
          if (opcion.correct.trim() === "") {
            return false;
          }
        }
      } else {
        let algunaOpcionCorrecta = false;
        for (const opcion of q.questionData.opciones) {
          if (opcion.correct) {
            algunaOpcionCorrecta = true;
            break;
          }
        }   
        if (!algunaOpcionCorrecta) {
          return false;
        }
      }
    }
    return true;
  };
  

  const onSubmitEnviarExamen = async (data) => {
    try {
      if (validateQuestions()) {
        const fechaActual = new Date();
        formDataExamen.fechaPresentado = fechaActual.toISOString();
        formDataExamen.duracion = 0;
        formDataExamen.calificacion = 0;
        // Obtener la hora actual en el formato HH:mm:ss
        const currentTime = fechaActual.toTimeString().split(' ')[0];
        formDataExamen.horaInicio = fechaActual.toISOString().split('T')[0] + 'T' + currentTime;
        formDataExamen.examenesIdExamen = examId.examId;
        formDataExamen.estudiantesIdUsuario = localStorage.getItem('id');
    
        const response = await examenPresentadoService.crearExamenPresentado(formDataExamen);
    
        if (response.success) {
          const idExamenPresentado = response.message;
    
          for (const q of questions) {
            formDataPregunta.idExamenPresentado = idExamenPresentado;
            formDataPregunta.idPregunta = q.questionData.id;
    
            const responsePreguntaExamen = await examenPresentadoService.crearPEP(formDataPregunta);
    
            if (responsePreguntaExamen.success) {
              const idPEP = responsePreguntaExamen.message;
              console.log('idPEP:', idPEP);
    
              for (const opcion of q.questionData.opciones) {
                if (opcion.correct) {
                  formDataOpcion.idOpcion = opcion.id;
                  formDataOpcion.idPEP = idPEP;

                  console.log('formDataOpcion:', formDataOpcion);
    
                  const responseOpcion = await examenPresentadoService.crearResExamPresentado(formDataOpcion);
    
                  if (!responseOpcion.success) {
                    console.error('Error al crear opciones:', responseOpcion.message);
                  }
                }
              }
            } else {
              console.error('Error al crear pregunta examen:', responsePreguntaExamen.message);
            }
          }
          Swal.fire({
            icon: 'success',
            title: 'Examen entregado correctamente',
          });
        } else {
          console.error('Error al crear examen presentado:', response.message);
        }
      }
    } catch (error) {
      console.error('Error al enviar examen:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el examen',
      });
    }
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
