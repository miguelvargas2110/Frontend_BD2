import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import MainMenu from './MainMenu';
import Swal from 'sweetalert2';
import RegisterUsers from './RegisterUsers.jsx';
import CreateQuiz from './CreateQuiz.jsx';

const AppContent = () => {
    const [componentToShow, setComponentToShow] = useState("login");

    const onClickLoginApp = () => {
        setComponentToShow("login");
        
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

    const onCreateQuiz = (nombreExamen, descripcionExamen, cantidadTotalPreguntas, tiempoExamen, group, tema, cantidadPreguntasEstudiante) => {
        console.log(nombreExamen, descripcionExamen, cantidadTotalPreguntas, tiempoExamen, group, tema, cantidadPreguntasEstudiante);
    };

    return (
      <>
        {componentToShow === "welcome" && <MainMenu onClickLogin={onClickLoginApp}/> }
        {componentToShow === "login" && <LoginForm  onLogin={onLogin} />}
        {componentToShow === "register" && <RegisterUsers onRegister={onRegister}/>}
        {componentToShow === "messages" && <AuthContent />}
        {componentToShow === "createQuiz" && <CreateQuiz onCreateQuiz={onCreateQuiz}/>}


      </>
    );
};

export default AppContent;
