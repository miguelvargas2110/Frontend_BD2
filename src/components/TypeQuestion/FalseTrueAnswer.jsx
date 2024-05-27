import React, { useState, useEffect } from "react";

const FalseTrueAnswer = ({ onOptionsChange, initialOptions, isBanco }) => {
  const defaultOptions = [
    { id: 1, text: "Falso", correct: false },
    { id: 2, text: "Verdadero", correct: false },
  ];

  const [options, setOptions] = useState(initialOptions || defaultOptions);
  const [correctOption, setCorrectOption] = useState(
    initialOptions ? initialOptions.find(option => option.correct)?.id : null
  );

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
    setCorrectOption(id);
    onOptionsChange(updatedOptions);
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
              type="radio"
              name="correctOption"
              className="w-5 h-5 mr-2"
              checked={correctOption === option.id}
              onChange={() => handleCorrectOptionChange(option.id)}
              disabled={isBanco}
            />
            <input
              type="text"
              placeholder={option.text}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 "
              value={option.text}
              readOnly
              onChange={(e) =>
                handleOptionTextChange(option.id, e.target.value)
              }
              disabled={isBanco || isExam}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default FalseTrueAnswer;
