import React, { useState, useEffect } from "react";
import bancoService from "../services/bancoService";

const QuestionsTeacherModal = ({ onSelectQuestion, closeModal, idTema, questions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    idTema: idTema,
    idProfesor: localStorage.getItem("id")
  });

  const [questionsTeacher, setQuestions] = useState([
    
  ]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        const response = await bancoService.bancoPrivado(formData);
        if(response.success){
          const filteredQuestions = response.message.filter(
            (question) => !questions.some((q) => q.questionData.id === question.id)
          );
          setQuestions(filteredQuestions);
        }
      }catch (error) {
        console.error('Error al obtener preguntas:', error.message);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectQuestion = (question) => {
    onSelectQuestion(question);
    closeModal();
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
        <h4 className="text-lg font-semibold mt-6">Seleccionar Pregunta</h4>
        <div className="mt-4 overflow-y-auto max-h-60">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 py-2">ID</th>
                <th className="border-b border-gray-300 py-2">Pregunta</th>
                <th className="border-b border-gray-300 py-2">
                  Tipo de Pregunta
                </th>
                <th className="border-b border-gray-300 py-2">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {questionsTeacher.map((question) => (
                <tr
                  key={question.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="border-b border-gray-300 py-2">
                    {question.id}
                  </td>
                  <td className="border-b border-gray-300 py-2">
                    {question.pregunta}
                  </td>
                  <td className="border-b border-gray-300 py-2">
                    {question.tipo_pregunta}
                  </td>
                  <td className="border-b border-gray-300 py-2">
                    <button
                      onClick={() => handleSelectQuestion(question)}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
        type="button"
        onClick={closeModal}
        className="px-6 py-2.5 w-full rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500 mt-4"
      >
        Cerrar
      </button>
      </div>
      <div className="text-right space-x-4"></div>
      
      
    </div>
  );
};

export default QuestionsTeacherModal;
