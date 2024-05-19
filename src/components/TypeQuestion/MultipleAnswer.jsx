import { useState } from "react";

const MultipleAnswer = () => {
  const [options, setOptions] = useState([
    { id: 1, text: "Opción 1", correct: false },
    { id: 2, text: "Opcion 2", correct: false },
  ]);

  const addOption = () => {
    const newOption = { id: options.length + 1, text: "Opcion n", correct: false };
    setOptions([...options, newOption]);
  };

  const handleOptionTextChange = (id, newText) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: newText } : option
    );
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (id) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, correct: !option.correct } : option
    );
    setOptions(updatedOptions);
  };

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
              placeholder={option.text}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-500"
              value={option.text}
              onChange={(e) =>
                handleOptionTextChange(option.id, e.target.value)
              }
            />
          </label>
        </div>
      ))}
      <button
        onClick={addOption}
        className="text-indigo-500 hover:underline mb-4"
      >
        Agregar otra opción
      </button>
    </div>
  );
};

export default MultipleAnswer;
