import { useState } from "react";

const FalseTrueAnswer = () => {
  const [options, setOptions] = useState([
    { id: 1, text: "Falso", correct: false },
    { id: 2, text: "Verdadero", correct: false },
  ]);
  const [correctOption, setCorrectOption] = useState(null);

  const handleOptionTextChange = (id, newText) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, text: newText } : option
    );
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (id) => {
    const updatedOptions = options.map((option) =>
      option.id === id
        ? { ...option, correct: true }
        : { ...option, correct: false }
    );
    setOptions(updatedOptions);
    setCorrectOption(id);
  };

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
    </div>
  );
};
export default FalseTrueAnswer;
