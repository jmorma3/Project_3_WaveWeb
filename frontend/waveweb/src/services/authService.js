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

const signup = async (userData) => {
  try {
    const { data } = await api.post("/auth/signup", userData);
    localStorage.setItem('token', data.token)
    localStorage.setItem("userId", data.userId)
    localStorage.setItem('userRole', data.userRole)

    return 200

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export {
  login,
  signup
}