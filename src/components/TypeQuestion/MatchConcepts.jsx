import React, { useState, useEffect } from "react";

const MatchConcepts = ({ onOptionsChange, initialOptions, isBanco, isExam }) => {
  const [options, setOptions] = useState(initialOptions || [
    { id: 1, text: "", correct: "" },
    { id: 2, text: "", correct: "" },
  ]);

  const addPair = () => {
    const newOption = {
      id: options.length + 1,
      text: "",
      correct: "",
    };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const deleteLastPair = () => {
    if (options.length > 2) {
      const updatedOptions = options.slice(0, options.length - 1);
      setOptions(updatedOptions);
      onOptionsChange(updatedOptions);
    }
  };

  const [respuestas, setRespuestas] = useState([]);

  const handleConceptChange = (id, newText, newCorrect) => {
    const updatedOptions = options.map((pair) =>
      pair.id === id ? { ...pair, text: newText, correct: newCorrect } : pair
    );
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };



  useEffect(() => {
    if (initialOptions) {
      if (isExam) {
        let respuestaString = initialOptions.map((option, index) => {
          return option.correct;
        }).join(" - ");
  
        // Crear una copia de initialOptions sin modificar la original
        let modifiedOptions = initialOptions.map(option => {
          return { ...option, correct: "" };
        });
  
        setRespuestas(respuestaString);
        setOptions(modifiedOptions);
      } else {
        setOptions(initialOptions);
      }
    }
  }, [initialOptions]);
  

  return (
    <div>
      <p className="mb-5 font-medium">
        {`Debes poner al frente de cada uno de los conceptos, con qué otro se empareja entre las siguiente opciones. ${respuestas}`}
      </p>
      {options.map((pair) => (
        <div className="mb-6 flex items-center" key={pair.id}>
          <label className="flex items-center w-full">
            <input
              type="text"
              placeholder="Concepto"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 mr-2 rounded-lg"
              required
              value={pair.text}
              onChange={(e) =>
                handleConceptChange(pair.id, e.target.value, pair.correct)
              }
              disabled={isBanco || isExam}
            />
            <span className="mx-2">→</span>
            <input
              type="text"
              placeholder="Emparejar"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
              required
              value={pair.correct}
              onChange={(e) =>
                handleConceptChange(pair.id, pair.text, e.target.value)
              }
              disabled={isBanco}
            />
          </label>
        </div>
      ))}
      <div className="flex justify-between mb-4">
        <button
          onClick={addPair}
          className={`text-indigo-500 hover:underline ${isExam ? 'hidden' : ''}`}
          type="button"
          disabled={isBanco}
        >
          Agregar otra pareja
        </button>
        <button
          onClick={deleteLastPair}
          className={`text-indigo-500 hover:underline ${isExam ? 'hidden' : ''}`}
          type="button"
          disabled={isBanco}
        >
          Eliminar última pareja
        </button>
      </div>
    </div>
  );
};

export default MatchConcepts;
