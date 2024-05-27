import React, { useState, useEffect } from "react";

const UniqueAnswer = ({ questionId, onOptionsChange, initialOptions, isBanco, isExam }) => {

  const [options, setOptions] = useState(initialOptions || [
    { id: 1, text: "", correct: false },
    { id: 2, text: "", correct: false },
  ]);
  const [correctOption, setCorrectOption] = useState(
    initialOptions ? initialOptions.find(option => option.correct)?.id : null
  );

  const addOption = () => {
    const newOption = {
      id: options.length + 1,
      text: "Opción " + Number(options.length + 1),
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
        option.id === id
          ? { ...option, correct: true }
          : { ...option, correct: false }
      );
      setOptions(updatedOptions);
      onOptionsChange(updatedOptions);
      setCorrectOption(id);
  };

  useEffect(() => {
    if (initialOptions) {

        if (isExam) {
            for (let i = 0; i < initialOptions.length; i++) {
                if (initialOptions[i].correct) {
                    initialOptions[i].correct = false;
                }
            }
        }

        setOptions(initialOptions);

        const initialCorrect = initialOptions.find(option => option.correct)?.id;
        setCorrectOption(initialCorrect);
    }
}, [initialOptions, isExam]);

  return (
    <div>
      {options.map((option) => (
        <div className="mb-6 flex items-center" key={option.id}>
          <label className="flex items-center w-full">
            <input
              id={`radioOption-${questionId}-${option.id}`}
              type="radio"
              name={`correctOption-${questionId}`}
              className="w-5 h-5 mr-2"
              checked={correctOption === option.id}
              onChange={() => handleCorrectOptionChange(option.id)}
              disabled={isBanco}
            />
            <input
              type="text"
              id="textOption"
              placeholder="Opción"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
              value={option.text}
              onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
              disabled={isBanco || isExam}
            />
          </label>
        </div>
      ))}
      <div className="flex justify-between mb-4">
        <button
          onClick={addOption}
          className={`text-indigo-500 hover:underline ${isExam ? 'hidden' : ''}`}
          type="button"
          disabled={isBanco}
        >
          Agregar otra opción
        </button>
        <button
          onClick={deleteLastOption}
          className={`text-red-500 hover:underline ${isExam ? 'hidden' : ''}`}
          type="button"
          disabled={isBanco}
        >
          Eliminar última opción
        </button>
      </div>
    </div>
  );
};

export default UniqueAnswer;
