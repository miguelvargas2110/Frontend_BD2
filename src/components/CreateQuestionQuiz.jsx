import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Question from "./Question";
import Swal from "sweetalert2";
import QuestionTeacherModal from "./QuestionsTeacherModal";

const CreateQuestionsQuiz = ({ onCrearQuestions }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState([{ id: 1, questionData: {} }]);

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, questionData: {} }]);
  };

  const handleRemoveQuestion = () => {
    if (questions.length > 1) {
      setQuestions(questions.slice(0, -1));
    }
  };

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, questionData: updatedQuestion } : q
      )
    );
  };

  const validateQuestions = () => {
    let totalPorcentaje = 0;
    for (const q of questions) {
      const { pregunta, valorPorcentaje, tipo_pregunta, opciones } = q.questionData;
      totalPorcentaje += Number(valorPorcentaje);

      if (!pregunta || pregunta.trim() === "") {
        Swal.fire({
          icon: "error",
          text: `La pregunta ${q.id} debe tener un enunciado.`,
        });
        return false;
      }

      if (!valorPorcentaje || Number(valorPorcentaje) <= 0) {
        Swal.fire({
          icon: "error",
          text: `La pregunta ${q.id} debe tener un porcentaje mayor a 0.`,
        });
        return false;
      }

      if (opciones) {
        for (const option of opciones) {
          if (!option.text || option.text.trim() === "") {
            Swal.fire({
              icon: "error",
              text: `La opción ${option.id} de la pregunta ${q.id} no puede estar vacía.`,
            });
            return false;
          }
        }
      }

      if (["Respuesta Unica", "Respuesta Multiple", "Falso - verdadero"].includes(tipo_pregunta)) {
        if (!opciones || opciones.length === 0 || !opciones.some((option) => option.correct)) {
          Swal.fire({
            icon: "error",
            text: `La pregunta ${q.id} debe tener al menos una opción correcta.`,
          });
          return false;
        }
      }

      if (tipo_pregunta === "Emparejar Conceptos") {
        if (!opciones || opciones.length === 0 || !opciones.every((option) => option.correct)) {
          Swal.fire({
            icon: "error",
            text: `La pregunta ${q.id} debe tener opciones emparejadas.`,
          });
          return false;
        }
      }
    }
    if (totalPorcentaje > 100) {
      Swal.fire({
        icon: "error",
        text: "La suma de los porcentajes de las preguntas no puede ser mayor a 100.",
      });
      return false;
    }
    return true;
  };

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const handleClearSelectedQuestion = () => {
    setSelectedQuestion(null);
  };

  const onSubmitCrearExamen = (data) => {
    if (validateQuestions()) {
      onCrearQuestions(
        data.nombreExamen,
        data.descripcionExamen,
        data.cantidadTotalPreguntas,
        data.tiempoExamen,
        data.group,
        data.tema,
        data.cantidadPreguntasEstudiante,
        questions.map((q) => q.questionData)
      );
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
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
                    alt="logo"
                    className="w-52 inline-block"
                  />
                </a>
                <h1 className="text-base font-semibold mt-5">
                  CREAR PREGUNTAS EXAMEN
                </h1>
              </div>
              <form onSubmit={handleSubmit(onSubmitCrearExamen)}>
                {/* <QuestionTeacherModal
                  onSelectQuestion={(question) => console.log("Question selected:", question)}
                  closeModal={() => console.log("Closing modal")}
                /> */}
                {questions.map((q) => (
                  <Question
                    key={q.id}
                    questionId={q.id}
                    onQuestionChange={handleQuestionChange}
                  />
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="text-blue-500 hover:underline"
                  >
                    Agregar Pregunta
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveQuestion}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar Pregunta
                  </button>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="btn btn-primary h-50% w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                  >
                    Crear Examen
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

export default CreateQuestionsQuiz;
