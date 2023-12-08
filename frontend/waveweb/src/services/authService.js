import api from "./config";

const login = async (body) => {
    try {
      const  data  = await api.post("/auth/admin/login", body)
      localStorage.setItem('token', data.token)
      console.log(data)
      return 200
    } catch (error) {
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.log(error.request);
        } else {
          // Algo sucedió en la configuración de la solicitud que generó un error
          console.log('Error', error.message);
        }
      }
  }
  
  export {
    login
  }