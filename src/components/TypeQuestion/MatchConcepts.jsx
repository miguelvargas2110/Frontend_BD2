import { useState } from "react";

const FalseTrueAnswer = () => {
  const [options, setOptions] = useState([
    { id: 1, text: "Falso", correct: false },
    { id: 2, text: "Verdadero", correct: false },
  ]);
  const [correctOption, setCorrectOption] = useState(null);
}