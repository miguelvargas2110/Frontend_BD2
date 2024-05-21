import React from "react";
import HeaderMain from "./HeaderMain";
import AsideMain from "./AsideMain";

const MainMenu = ({ onClickNavigate }) => {
  const onViewExam = () => {
    onClickNavigate("createQuestionsQuiz");
  };

  return (
    <>
      <div className="relative">
        <button type="button" onClick={onViewExam}>
          Sapo
        </button>
        <HeaderMain />
        <AsideMain />
        <main className="max-w-full h-full flex relative overflow-y-hidden">
          <h1 className="absolute top-0 left-0 w-full text-4xl text-center font-bold mt-10 z-10">
            Menu Principal
          </h1>
          <div className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll relative z-0">
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
            <div className="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainMenu;
