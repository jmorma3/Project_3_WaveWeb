import api from "./config";

const login = async (body) => {
  try {
    const {data} = await api.post("/auth/login", body)
    localStorage.setItem('token', data.token)
    localStorage.setItem("userId", parseInt(data.userId))  //Recogemos el "userId" y lo parseamos a Integer para usarlo en diferentes componentes...
    return 200
  } catch (error) {
    console.log(error)
  }
}

export {
  login
}