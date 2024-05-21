import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Question from "./Question";
import Swal from "sweetalert2";
import QuestionsTeacherModal from "./QuestionsTeacherModal";
import QuestionsPublicModal from "./QuestionsPublicModal";

const CreateQuestionsQuiz = ({ onCrearExamen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState([{ id: 1, questionData: {} }]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const cantidadTotalPreguntas = watch("cantidadTotalPreguntas");

  const handleAddQuestion = () => {
    if (Number(cantidadTotalPreguntas) > questions.length) {
      const newId = questions.length + 1;
      setQuestions([...questions, { id: newId, questionData: {} }]);
    } else {
      Swal.fire({
        icon: "error",
        text: `No se pueden agregar más preguntas`,
      });
    }
  };

  const handleRemoveQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    Swal.fire({
      icon: "success",
      text: `La pregunta fue eliminada`,
    });
  };

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, questionData: updatedQuestion } : q
      )
    );
  };

  const validateQuestions = () => {
    console.log(questions);
    let totalPorcentaje = 0;
    for (const q of questions) {
      const { pregunta, valorPorcentaje, tipo_pregunta, opciones } =
        q.questionData;
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

      if (
        ["Respuesta Unica", "Respuesta Multiple", "Falso - Verdadero"].includes(
          tipo_pregunta
        )
      ) {
        if (
          !opciones ||
          opciones.length === 0 ||
          !opciones.some((option) => option.correct)
        ) {
          Swal.fire({
            icon: "error",
            text: `La pregunta ${q.id} debe tener al menos una opción correcta.`,
          });
          return false;
        }
      }

      if (tipo_pregunta === "Emparejar Conceptos") {
        if (
          !opciones ||
          opciones.length === 0 ||
          !opciones.every((option) => option.correct)
        ) {
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

  const onSubmitCrearExamen = (data) => {
    if (validateQuestions()) {
      onCrearExamen(
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

  const handleSelectQuestion = (question) => {
    if (Number(cantidadTotalPreguntas) > questions.length) {
      const newId = questions.length + 1;
      const { id, ...questionDataWithoutId } = question;
      const newQuestion = { id: newId, questionData: questionDataWithoutId };
      setQuestions([...questions, newQuestion]);
      setShowModal(false);
    } else {
      setShowModal(false);
      Swal.fire({
        icon: "error",
        text: `No se pueden agregar más preguntas`,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openTeacherModal = () => {
    setModalType("teacher");
    setShowModal(true);
  };

  const openPublicModal = () => {
    setModalType("public");
    setShowModal(true);
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
                    <option value="Grupo 1">Grupo 1</option>
                    <option value="Grupo 2">Grupo 2</option>
                    <option value="Grupo 3">Grupo 3</option>
                    <option value="Grupo 4">Grupo 4</option>
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
                <div className="!mt-5 mb-5 text-center">
                  <h1 className="text-base font-semibold mt-5">
                    Preguntas del examen
                  </h1>
                </div>
                {questions.map((q) => (
                  <div key={q.id}>
                    <Question
                      key={q.id}
                      questionId={q.id}
                      onQuestionChange={handleQuestionChange}
                      initialData={q.questionData}
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="text-blue-500 hover:underline"
                  >
                    Agregar Pregunta Nueva
                  </button>
                  <button
                    type="button"
                    onClick={openPublicModal}
                    className="text-blue-500 hover:underline"
                  >
                    Agregar Pregunta de Banco Público
                  </button>
                  <button
                    type="button"
                    onClick={openTeacherModal}
                    className="text-blue-500 hover:underline"
                  >
                    Agregar Pregunta de Banco Privado
                  </button>
                  <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
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
              {showModal && modalType === "teacher" && (
                <QuestionsTeacherModal
                  onSelectQuestion={handleSelectQuestion}
                  closeModal={closeModal}
                />
              )}
              {showModal && modalType === "public" && (
                <QuestionsPublicModal
                  onSelectQuestion={handleSelectQuestion}
                  closeModal={closeModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionsQuiz;
