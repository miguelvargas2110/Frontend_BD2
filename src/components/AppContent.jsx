import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import MainMenu from './MainMenu';
import Swal from 'sweetalert2';
import RegisterUsers from './RegisterUsers.jsx';
import CreateQuiz from './CreateQuiz.jsx';
import CreateQuestionsQuiz from './CreateQuestionQuiz.jsx';

const AppContent = () => {
    const [componentToShow, setComponentToShow] = useState("welcome");

    const navigateTo = (componentName) => {
        setComponentToShow(componentName);
    };

    const logout = () => {
        setComponentToShow("login");
        setAuthHeader(null);
    };

    const onLogin = () => {
        setComponentToShow("welcome")
    };

    const onRegister = () => {
        setComponentToShow("login");
    };

    const onCrearExamen = (nombreExamen, descripcionExamen, cantidadTotalPreguntas, tiempoExamen, group, tema, cantidadPreguntasEstudiante, questions) => {
        console.log(nombreExamen, descripcionExamen, cantidadTotalPreguntas, tiempoExamen, group, tema, cantidadPreguntasEstudiante, questions);
    };

    return (
      <>
        {componentToShow === "welcome" && <MainMenu onClickNavigate={navigateTo} />}
        {componentToShow === "login" && <LoginForm onLogin={onLogin} />}
        {componentToShow === "register" && <RegisterUsers onRegister={onRegister} />}
        {componentToShow === "messages" && <AuthContent />}
        {componentToShow === "createQuiz" && <CreateQuiz onCreateQuiz={onCreateQuiz} />}
        {componentToShow === "createQuestionsQuiz" && <CreateQuestionsQuiz onCrearExamen={onCrearExamen} />}
      </>
    );
};

export default AppContent;
