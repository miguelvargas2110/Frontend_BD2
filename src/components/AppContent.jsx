import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import MainMenu from './MainMenu';
import Swal from 'sweetalert2';
import RegisterUsers from './RegisterUsers.jsx';
import CreateQuiz from './CreateQuiz.jsx';

const AppContent = () => {
    const [componentToShow, setComponentToShow] = useState("createQuiz");

    const onClickLoginApp = () => {
        setComponentToShow("login");
        
    };

    const logout = () => {
        setComponentToShow("login");
        setAuthHeader(null);
    };

    const onLogin = (username, password) => {
        var usernamePrueba = "miguel.vargas2110@gmail.com";
        var passwordPrueba = "123456789";
        if (username === usernamePrueba && password === passwordPrueba) {
            Swal.fire({
                icon: "success",
                title: "El usuario con correo " + username + " ha iniciado sesion correctamente",
                showConfirmButton: true,
                timer: 5000
              });
            setComponentToShow("welcome");
        }else{
            Swal.fire({
                icon: "error",
                text: "Credenciales invalidas",
              });
        }
    };

    const onRegister = (id, nombre, apellido, rol, group , email, password) => {
        console.log(id, nombre, apellido, rol, group, email, password);
        /*
        request(
            "POST",
            "/register",
            {
                id: id,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                email: email,
                password: password,
                rol_id: "1"
            }).then(
            (response) => {
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "El usuario con correo " + response.data.email + " ha sido registrado correctamente",
                    showConfirmButton: false,
                    timer: 5000
                  });
                setAuthHeader(response.data.token);
            }).catch(
            (error) => {
                Swal.fire({
                    icon: "error",
                    text: error.response.data.message,
                  });
                  
                setAuthHeader(null);
            }
        );*/
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
