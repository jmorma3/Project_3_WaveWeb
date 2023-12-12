import api from "./config";

const login = async (body) => {
  try {
    const { data } = await api.post("/auth/login", body)
    localStorage.setItem('token', data.token)

    //Recogemos también el "userId" y "userRole" para usarlos en diferentes componentes...
    localStorage.setItem("userId", data.userId)
    localStorage.setItem('userRole', data.userRole)

    return 200
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const signup = async (userData, projectData) => {
  try {
    // Usuario
    const userResponse = await api.post("/auth/signup", userData);

    // // Iniciar sesión para obtener el token y userId
    const loginResponse = await api.post("/auth/login", {
      email: userData.email,
      password: userData.password
    });

    // // Almacenar el token y el userId en localStorage
    localStorage.setItem('token', loginResponse.data.token);
    localStorage.setItem('userId', loginResponse.data.userId)

    // Proyecto
    const projectResponse = await api.post("/project/myProjects", {
      ...projectData,
      progress_status: 0,
      plus_prototype: false,
      clientId: localStorage.getItem('userId')
    });

    return {
      user: userResponse.data,
      project: projectResponse.data
    };

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export {
  login,
  signup
}