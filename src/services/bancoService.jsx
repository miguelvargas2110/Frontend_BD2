import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

const bancoService = {

    bancoPrivado: async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/bancoPrivado`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                return { success: true, message: response.data.respuesta }
            } else {
                return { success: false, message: 'La solicitud al servidor no fue exitosa' };
            }
        } catch (error) {
            return { success: false, message: error.response.data.error };
        }
    },

    bancoPublico: async (idTema) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/bancoPublico`, idTema, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                return { success: true, message: response.data.respuesta }
            } else {
                return { success: false, message: 'La solicitud al servidor no fue exitosa' };
            }
        } catch (error) {
            return { success: false, message: error.response.data.error };
        }
    },
};

export default bancoService;