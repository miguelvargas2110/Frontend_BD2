import React, { useState } from 'react';
import HeaderMain from "./HeaderMain";
import CreateQuestionsQuiz from './CreateQuestionQuiz';
import PresentarExamen from './PresentarExamen';
import ElegirExamen from './ElegirExamen';


const MainMenu = () => {
  const [componentToShow, setComponentToShow] = useState("");
  const [selectedExamId, setSelectedExamId] = useState(null);

  const onClickNavigate = () => {
    setComponentToShow("createQuestionQuiz");
  };

  const onClickPrincipal = () => {
    setComponentToShow("");
  };

  const onClickElegirExamen = () => {
    setComponentToShow("ElegirExamen");
  };

  const onSelectExamen = (examId) => {
    setSelectedExamId(examId);
    setComponentToShow("PresentarExamen");
  };

  return (
    <>
      <div className="relative">
        <HeaderMain 
          onClickNavigate={onClickNavigate} 
          onClickPrincipal={onClickPrincipal} 
          onClickElegirExamen={onClickElegirExamen}
        />
        {componentToShow === "createQuestionQuiz" && (
          <CreateQuestionsQuiz />
        )}
        {componentToShow === "ElegirExamen" && (
          <ElegirExamen onSelectExamen={onSelectExamen} />
        )}
        {componentToShow === "PresentarExamen" && selectedExamId && (
          <PresentarExamen examId={selectedExamId} />
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
