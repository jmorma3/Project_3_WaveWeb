import api from "./config";


const getAllUsers = async () => {
    try {
        const { data } = await api.get("/user", {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const getOneUser = async (userId) => {
    try {
        const { data } = await api.get(`/user/${userId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const updateOneUser = async (userId, body) => {
    try {
        const { data } = await api.put(`/user/${userId}`, body, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const deleteOneUser = async (userId) => {
    try {
        const { data } = await api.delete(`/user/${userId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export {
    getAllUsers,
    getOneUser,
    updateOneUser, 
    deleteOneUser
}