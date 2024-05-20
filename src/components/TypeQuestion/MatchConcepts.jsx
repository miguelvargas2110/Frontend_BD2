import React, { useState } from "react";

const MatchConcepts = ({ onOptionsChange }) => {
  const [options, setOptions] = useState([
    { id: 1, text: "", correct: "" },
    { id: 2, text: "", correct: "" },
  ]);

  const addPair = () => {
    const newOption = {
      id: options.length + 1,
      text: "",
      correct: "",
    };
    setOptions([...options, newOption]);
    onOptionsChange([...options, newOption]);
  };

  const deleteLastPair = () => {
    if (options.length > 2) {
      const updateOptions = options.slice(0, options.length - 1);
      setOptions(updateOptions);
      onOptionsChange(updateOptions);
    }
  };

  const handleConceptChange = (id, newtext, newcorrect) => {
    const updateOptions = options.map((pair) =>
      pair.id === id ? { ...pair, text: newtext, correct: newcorrect } : pair
    );
    setOptions(updateOptions);
    onOptionsChange(updateOptions);
  };

  return (
    <div>
      <p className="mb-5 font-medium">
        Debes poner al frente de cada uno de los conceptos, con qué otro se empareja. En el enunciado de la pregunta deben estar los conceptos que se pondrán en la derecha.
      </p>
      {options.map((pair) => (
        <div className="mb-6 flex items-center" key={pair.id}>
          <label className="flex items-center w-full">
            <input
              type="text"
              placeholder="Concepto"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-500 mr-2 rounded-lg"
              required
              onChange={(e) =>
                handleConceptChange(pair.id, e.target.value, pair.correct)
              }
            />
            <span className="mx-2">→</span>
            <input
              type="text"
              placeholder="Emparejar"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-500 rounded-lg"
              required
              onChange={(e) =>
                handleConceptChange(pair.id, pair.text, e.target.value)
              }
            />
          </label>
        </div>
      ))}
      <div className="flex justify-between mb-4">
        <button
          onClick={addPair}
          className="text-indigo-500 hover:underline"
          type="button"
        >
          Agregar otra pareja
        </button>
        <button
          onClick={deleteLastPair}
          className="text-red-500 hover:underline"
          type="button"
        >
          Eliminar última pareja
        </button>
      </div>
    </div>
  );
};

export default MatchConcepts;
