import React, { useEffect } from 'react';
import examenService from '../services/examenService';

const ElegirExamen = ({ onSelectExamen }) => {
  const [exams, setExams] = React.useState([]);

  useEffect(() => {
    const fetchExamenes = async () => {
      const response = await examenService.obtenerExamenesEstudiante(localStorage.getItem('id'));
      if (response.success) {
        setExams(response.message);
      } else {
        console.error('Error al obtener examenes:', response.message);
      }
    };
    fetchExamenes();
  }, []);

  return (
    <div className="exam-selection flex justify-center items-center bg-gray-100 mb-10 w-full h-full">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Selecciona un Examen</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <li key={exam.id}>
              <div
                className="bg-white shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border p-2 w-full rounded-lg font-[sans-serif] overflow-hidden mx-auto">
                <img src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg" className="w-full rounded-lg" />
                <div className="px-4 my-6 text-center">
                  <h3 className="text-lg font-semibold">{exam.name}</h3>
                  <button type="button"
                    onClick={() => onSelectExamen(exam.id)}
                    className="px-6 py-2 w-full mt-4 rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Presentar Examen</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
   
};

export default ElegirExamen;
