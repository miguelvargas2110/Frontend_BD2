import axios from "axios";

const BASE_URL = 'http://localhost:9090';

const examenPresentadoService = {
    crearExamenPresentado: async (examenPresentado) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/registrarExamenPresentado`, examenPresentado, {
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
    crearPEP: async (pep) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/registrarPEP`, pep, {
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
    crearResExamPresentado: async (resExamPresentado) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/registrarResExamPre`, resExamPresentado, {
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
    }
};

export default examenPresentadoService;