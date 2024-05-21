import React, { useState, useEffect } from 'react';
import HeaderMain from "./HeaderMain";
import CreateQuestionsQuiz from "./CreateQuestionQuiz";

const MainMenu = ({onCrearExamen }) => {
  const onViewExam = () => {
    onClickNavigate("createQuestionsQuiz");
  };

  const [componentToShow, setComponentToShow] = useState("");

  const onClickNavigate = () => {
    setComponentToShow("createQuestionQuiz")
  }

  return (
    <>
      <div className="relative">
        <HeaderMain onClickNavigate={onClickNavigate} />
        {componentToShow === "createQuestionQuiz" && (
          <CreateQuestionsQuiz onCrearExamen={onCrearExamen} />
        )}
        {componentToShow === "" && (
          <h1 className="absolute top-0 left-0 w-full text-4xl text-center py-20 font-bold mt-10 z-10">
            Menu Principal
          </h1>
        )}
      </div>
    </>
  );
};

export default MainMenu;
