import React, { useState, useEffect } from "react";

const MultipleAnswer = ({ onOptionsChange, initialOptions }) => {
  const [options, setOptions] = useState(initialOptions || [
    { id: 1, text: "", correct: false },
    { id: 2, text: "", correct: false },
  ]);

  const addOption = () => {
    const newOption = {
      id: options.length + 1,
      text: "",
      correct: false,
    };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const deleteLastOption = () => {
    if (options.length > 2) {
      const updatedOptions = options.slice(0, options.length - 1);
      setOptions(updatedOptions);
      onOptionsChange(updatedOptions);
    }
  };

  const handleOptionTextChange = (id, newText) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: newText } : option
    );
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const handleCorrectOptionChange = (id) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, correct: !option.correct } : option
    );
    setOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  useEffect(() => {
    if (initialOptions) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  return (
    <div>
      {options.map((option) => (
        <div className="mb-6 flex items-center" key={option.id}>
          <label className="flex items-center w-full">
            <input
              type="checkbox"
              name={`correctOption-${option.id}`}
              className="w-5 h-5 mr-2"
              checked={option.correct}
              onChange={() => handleCorrectOptionChange(option.id)}
            />
            <input
              type="text"
              placeholder={"Opcion"}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
              value={option.text}
              onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
            />
          </label>
        </div>
      ))}
      <div className="flex justify-between mb-4">
        <button
          onClick={addOption}
          className="text-indigo-500 hover:underline"
          type="button"
        >
          Agregar otra opción
        </button>
        <button
          onClick={deleteLastOption}
          className="text-red-500 hover:underline"
          type="button"
        >
          Eliminar última opción
        </button>
      </div>
    </div>
  );
};

export default MultipleAnswer;
