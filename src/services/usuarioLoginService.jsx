import axios from 'axios';

const loginUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:9090/autenticacion/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            localStorage.setItem("id", response.data.respuesta.id);
            localStorage.setItem("nombre", response.data.respuesta.nombre);
            localStorage.setItem("apellido", response.data.respuesta.apellido);
            localStorage.setItem("rol", response.data.respuesta.rol);
            return { success: true }; // Retornamos solo éxito
        } else {
            console.log("No se pudo loguear al usuario")
            return { success: false, message: 'La solicitud al servidor no fue exitosa' };
        }
    } catch (error) {
        console.log(error.response)
        return { success: false, message: error.response.data.error};
    };
};

export default loginUser;