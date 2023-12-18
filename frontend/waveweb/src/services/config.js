import axios from "axios"

const api = axios.create({
    baseURL: "mysql://root:DCBd33CG4Hf1hdHH1AcEhFCD5ceF3dfF@monorail.proxy.rlwy.net:23694/railway"
})

export default api