import axios from "axios"

const api = axios.create({
    baseURL: "http://project3waveweb-production.up.railway.app/api"
})

export default api