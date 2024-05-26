import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Question from "./Question";
import Swal from "sweetalert2";
import QuestionsTeacherModal from "./QuestionsTeacherModal";
import QuestionsPublicModal from "./QuestionsPublicModal";
import grupoServices from "../services/gruposService";
import temasService from "../services/temasService";
import tipoPregunta from "../services/tipoPreguntaService";
import examenService from "../services/examenService";

const CreateQuestionsQuiz = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [grupos, setGrupos] = useState([]); // Inicializa grupos como un array vacío
  const [temas, setTemas] = useState([]); // Nuevo estado para los temas
  const [tipoPreguntas, setTipoPreguntas] = useState([]); // Nuevo estado para los tipos de preguntas
  const [isQuestionAdded, setIsQuestionAdded] = useState(false);

  useEffect(() => {
    const fetchGrupos = async () => {
      const response = await grupoServices.obtenerGruposProfesor(localStorage.getItem("id"));
      if (response.success) {
        setGrupos(response.message);
        fetchTemas(response.message[0][0]); // Llamar a fetchTemas con el primer grupo
      } else {
        console.error("Error al obtener grupos:", response.message);
      }
    };
    fetchGrupos();
    const fetchTipoPregunta = async () => {
      const response = await tipoPregunta.obtenertipoPregunta();
      if (response.success) {
        setTipoPreguntas(response.message);
      } else {
        console.error("Error al obtener tipo de preguntas:", response.message);
      }
    };
    fetchTipoPregunta();
  }, []);

  const fetchTemas = async (idGrupo) => {
    const response = await temasService.obtenerTemas(idGrupo);
    if (response.success) {
      formDataExamen.idTema = response.message[0][0]; // Asigna el primer tema al estado
      setTemas(response.message); // Asigna los temas al estado
    } else {
      console.error("Error al obtener temas:", response.message);
    }
  };


  const [formDataExamen, setFormDataExamen] = useState({
    nombre: "",
    descripcion: "",
    cantidadTotalPreguntas: 0,
    duracion: 0,
    cantidadPreguntas: 0,
    idGrupo: 0,
    idTema: 0,
  });

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

  const [formDataPreguntaExamen, setFormDataPreguntaExame] = useState({
    idPregunta: 0,
    idExamen: 0,
    porcentajePregunta: 0,
  });
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTema, setSelectedTema] = useState("");

  const handleGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedGroup(selectedGroup);  // Actualiza el estado
    setSelectedTema("");  // Limpia el tema seleccionado
    fetchTemas(selectedGroup);
  };

  const handleTemaChange = (event) => {
    const selectedTema = event.target.value;
    setSelectedTema(selectedTema);  // Actualiza el estado
    formDataExamen.idTema = selectedTema;
  };

  const [questions, setQuestions] = useState([]);
  const questionIdRef = useRef(1);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");


  const cantidadTotalPreguntas = watch("cantidadTotalPreguntas");

  const handleAddQuestion = () => {
    if (Number(cantidadTotalPreguntas) > questions.length) {
      const newId = questionIdRef.current++;
      setQuestions([...questions, { id: newId, questionData: {} }]);
      setIsQuestionAdded(true);
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
    if (questions.length === 1) {
      setIsQuestionAdded(false);
    }
  };

  const handleQuestionChange = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, questionData: updatedQuestion } : q))
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

      if (
        ["Respuesta Unica", "Respuesta Multiple", "Falso - Verdadero"].includes(
          tipo_pregunta
        )
      ) {
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

  const onSubmitCrearExamen = async (data) => {
    console.log(data)
    if (validateQuestions()) {
      formDataExamen.nombre = data.nombreExamen;
      formDataExamen.descripcion = data.descripcionExamen;
      formDataExamen.cantidadTotalPreguntas = data.cantidadTotalPreguntas;
      formDataExamen.duracion = data.tiempoExamen;
      formDataExamen.idGrupo = data.group;
      formDataExamen.idTema = data.tema;
      formDataExamen.cantidadPreguntas = data.cantidadPreguntasEstudiante;
      try {
        const responseExamen = await examenService.crearExamen(formDataExamen);
        if (responseExamen.success) {
          for (const q of questions) {
            console.log(q)
            if (!q.questionData.isBanco) {
              formDataPregunta.preguntaTexto = q.questionData.pregunta;
              formDataPregunta.privacidad = q.questionData.privacidad;
              formDataPregunta.idProfesor = localStorage.getItem("id");
              formDataPregunta.idPreguntaPadre = null;
              formDataPregunta.idTema = data.tema;
              formDataPregunta.idTipoPregunta = q.questionData.tipo_pregunta;

              try {
                const responsePregunta = await examenService.crearPreguntas(formDataPregunta);
                if (responsePregunta.success) {
                  for (const o of q.questionData.opciones) {
                    formDataOpcion.texto = o.text;
                    formDataOpcion.respuesta = o.correct;
                    formDataOpcion.idPregunta = responsePregunta.message;
                    try {
                      const responseOpcion = await examenService.crearOpciones(formDataOpcion);
                      if (!responseOpcion.success) {
                        Swal.fire({
                          icon: "error",
                          text: `Error al crear opciones de la pregunta ${q.id}`,
                        });
                      }
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        text: `Error en el servidor al crear opciones de la pregunta ${q.id}`,
                      });
                    }
                  }
                  formDataPreguntaExamen.idPregunta = responsePregunta.message;
                } else {
                  Swal.fire({
                    icon: "error",
                    text: `Error al crear la pregunta ${q.id}`,
                  });
                }
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  text: `Error en el servidor al crear la pregunta ${q.id}`,
                });
              }
            } else {
              formDataPreguntaExamen.idPregunta = q.questionData.id;
              console.log(q.questionData.id)
            }
            formDataPreguntaExamen.idExamen = responseExamen.message;
            formDataPreguntaExamen.porcentajePregunta = q.questionData.valorPorcentaje;
            try {
              const responsePreguntaExamen = await examenService.crearPreguntaExamen(
                formDataPreguntaExamen
              );
              if (!responsePreguntaExamen.success) {
                Swal.fire({
                  icon: "error",
                  text: `Error al crear la relación de pregunta-examen para la pregunta ${q.id}`,
                });
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                text: `Error en el servidor al crear la relación de pregunta-examen para la pregunta ${q.id}`,
              });
            }
          }
          Swal.fire({
            icon: "success",
            text: "Examen creado exitosamente",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: `Error al crear el examen: ${responseExamen.message}`,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: "Error en el servidor al crear el examen",
        });
      }
    }
  };

  const openTeacherModal = () => {
    setModalType("teacher");
    setShowModal(true);
  };

  const openPublicModal = () => {
    setModalType("public");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectQuestion = (question) => {
    if (Number(cantidadTotalPreguntas) > questions.length) {
      const newId = questionIdRef.current++;
      setQuestions([...questions, { id: newId, questionData: question }]);
      setIsQuestionAdded(true);
    } else {
      Swal.fire({
        icon: "error",
        text: `No se pueden agregar más preguntas`,
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
                    Grupos del profesor
                  </label>
                  <select
                    id="group"
                    name="group"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    {...register("group")}
                    onChange={handleGroupChange}
                    disabled={isQuestionAdded}
                  >
                    <option value="">Selecciona un grupo</option>
                    {grupos.map((grupo) => (
                      <option key={grupo[0]} value={grupo[0]}>
                        {grupo[1]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="text-lg font-medium">Tema del Examen</label>
                  <select
                    id="tema"
                    name="tema"
                    className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    {...register("tema")}
                    onChange={handleTemaChange}
                    disabled={isQuestionAdded}
                  >
                    <option value="">Selecciona un tema</option>
                    {temas.map((tema) => (
                      <option key={tema[0]} value={tema[0]}>
                        {tema[1]}
                      </option>
                    ))}
                  </select>
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
                  <h1 className="text-base font-semibold mt-5">Preguntas del examen</h1>
                </div>
                {questions.map((q) => (
                  <div key={q.id}>
                    <Question
                      key={q.id}
                      questionId={q.id}
                      onQuestionChange={handleQuestionChange}
                      initialData={q.questionData}
                    />
                    <div className="p-6 max-w-3xl mx-auto mb-3">
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar Pregunta
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="text-blue-500 hover:underline"
                    disabled={!selectedGroup || !selectedTema}
                  >
                    Agregar Pregunta Nueva
                  </button>
                  <button
                    type="button"
                    onClick={openPublicModal}
                    className="text-blue-500 hover:underline"
                    disabled={!selectedGroup || !selectedTema}
                  >
                    Agregar Pregunta de Banco Público
                  </button>
                  <button
                    type="button"
                    onClick={openTeacherModal}
                    className="text-blue-500 hover:underline"
                    disabled={!selectedGroup || !selectedTema}
                  >
                    Agregar Pregunta de Banco Privado
                  </button>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="btn btn-primary h-50% w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                    disabled={!selectedGroup || !selectedTema}
                  >
                    Crear Examen
                  </button>
                </div>
              </form>
              {showModal && modalType === "teacher" && (
                <QuestionsTeacherModal
                  onSelectQuestion={handleSelectQuestion}
                  closeModal={closeModal}
                  idTema={formDataExamen.idTema}
                  questions={questions}
                />
              )}
              {showModal && modalType === "public" && (
                <QuestionsPublicModal
                  onSelectQuestion={handleSelectQuestion}
                  closeModal={closeModal}
                  idTema={formDataExamen.idTema}
                  questions={questions}
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
