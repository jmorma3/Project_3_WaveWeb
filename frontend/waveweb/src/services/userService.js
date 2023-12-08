import api from "./config";


const getAllUsers = async() => {
    try {
        const {data} = await api.get("/user")
        return data
    } catch (error) {
        return error
    }
}

export {
    getAllUsers
}