import React, { useState } from "react";
import Swal from "sweetalert2";

const HeaderMain = ({ onClickLogin, onClickNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const isProfesor = localStorage.getItem("rol").includes("Profesor");

  const onViewExam = () => {
    onClickNavigate("createQuestionsQuiz");
  };

  return (
    <header className="flex shadow-sm py-3 px-4 sm:px-10 bg-blue-200 font-[sans-serif] min-h-[30px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        <a>
          <img
            src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
            alt="logo"
            className="w-16"
          />
        </a>

        <div
          id="collapseMenu"
          className={`max-lg:hidden lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >

          <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a >
                <img
                  src="https://res.cloudinary.com/dgp8hrrbj/image/upload/v1715982390/esbmqo746arulx4wywer.png"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:after:absolute lg:after:bg-black lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
            {isProfesor && (

              <button onClick={onViewExam}>
                <a className="text-black block text-[15px]">
                Crear Examen
              </a>
                
              </button>
            )}
        </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
              <a  className="text-black block text-[15px]">
                Loading
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
              <a  className="text-black block text-[15px]">
              Loading
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
              <a  className="text-black block text-[15px]">
              Loading
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
              <a  className="text-black block text-[15px]">
              Loading
              </a>
            </li>
            <li className="max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-black lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300">
              <a  className="text-black block text-[15px]">
              Loading
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center max-sm:ml-auto space-x-6">
          <div className="flex flex-col items-end">
            <div className="text-md font-medium">
              {localStorage.getItem("apellido")}
            </div>
            <div className="text-sm font-regular">
              {localStorage.getItem("rol")}
            </div>
          </div>

          <ul>
            <li className="relative px-1 after:absolute after:bg-black after:w-full after:h-[2px] after:block after:top-8 after:left-0 after:transition-all after:duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                className="cursor-pointer hover:fill-black"
                viewBox="0 0 512 512"
              >
                <path
                  d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                  data-original="#000000"
                />
              </svg>
            </li>
          </ul>

          <button
            id="toggleOpen"
            className="lg:hidden ml-7"
            onClick={handleMenuToggle}
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
