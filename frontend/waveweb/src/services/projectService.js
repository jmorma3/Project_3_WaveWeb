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

const getUserOneProject = async (projectId) => {
    try {
        const { data } = await api.get(`/project/myProjects/${projectId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data.project
    } catch (error) {
        return error
    }
}

export {
    getUserProjects,
    getUserOneProject
}