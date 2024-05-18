import axios from 'axios';

const registerUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:9090/autenticacion/registro', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 200) {
            return { success: true }; // Retornamos solo éxito
        } else {
            return { success: false, message: 'La solicitud al servidor no fue exitosa' };
        }
    } catch (error) {
        console.log(error.response)
        return { success: false, message: error.response.data.error};
    };
};

export default registerUser;