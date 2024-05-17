import React from "react";
import HeaderMain from "./HeaderMain";
import AsideMain from "./AsideMain";

const MainMenu = ({ onClickLogin }) => {
  const onClickLoginMain = (state) => {
    onClickLogin(state);
  };

  return (
    <>
      <div className="relative">
  <HeaderMain onClickLogin={onClickLoginMain} />
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


      {/* <main class="max-w-full h-full flex relative overflow-y-hidden">

      <div class="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
  
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
        <div class="w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-gray-400"></div>
      </div>
      </main>  */}
    </>
  );
};

export default MainMenu;
