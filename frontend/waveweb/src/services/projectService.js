import api from "./config";


const getUserProjects = async () => {
    try {
        const { data } = await api.get("/project/myProjects", {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data.projects
    } catch (error) {
        return error
    }
}

export {
    getUserProjects
}