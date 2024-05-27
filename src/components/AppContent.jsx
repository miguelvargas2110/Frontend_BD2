import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import MainMenu from './MainMenu';
import RegisterUsers from './RegisterUsers.jsx';

const AppContent = () => {
    const [componentToShow, setComponentToShow] = useState("login");

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

    const navigateToRegister = () => {
        setComponentToShow("register");
    };

    const navigateToLogin = () => {
        setComponentToShow("login");
    };

    return (
      <>
        {componentToShow === "welcome" && <MainMenu />}
        {componentToShow === "login" && <LoginForm onLogin={onLogin} navigateToRegister={navigateToRegister} />}
        {componentToShow === "register" && <RegisterUsers onRegister={onRegister} navigateToLogin={navigateToLogin} />}
        {componentToShow === "messages" && <AuthContent />}
      </>
    );
};

export default AppContent;
