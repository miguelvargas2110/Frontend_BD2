import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

const examenService = {
    crearExamen: async (examen) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/examen`, examen, {
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
    crearPreguntas: async (pregunta) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/pregunta`, pregunta, {
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
    crearOpciones: async (opcion) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/opcion`, opcion, {
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
    crearPreguntaExamen: async (preguntaExamen) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/preguntaExamen`, preguntaExamen, {
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

    obtenerExamenesEstudiante: async (idEstudiante) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/examenesEstudiante`, idEstudiante, {
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

    obtenerPreguntasExamen: async (idExamen) => {
        try {
            const response = await axios.post(`${BASE_URL}/ejemplos/preguntasExamen`, idExamen, {
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
}
   

export default examenService;