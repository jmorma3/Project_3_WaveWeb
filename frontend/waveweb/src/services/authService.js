import api from "./config";

const login = async (body) => {
  try {
    const {data} = await api.post("/auth/login", body)
    localStorage.setItem('token', data.token)
    return 200
  } catch (error) {
    console.log(error)
  }
}

export {
  login
}