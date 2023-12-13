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

const createProject = async (projectData) => {
  try {
    const { data } = await api.post('/project/myProjects', projectData,
      {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })

    return data.project
  } catch (error) {
    console.error(error)
    return error
  }
}

const updateOwnProject = async (projectId, newProgressStatus) => {
  try {
    const { data } = await api.put(`/project/myProjects/${projectId}`,
      {
        progress_status: newProgressStatus,
        userId: parseInt(localStorage.getItem("userId")),
      },
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};




export {
  getUserProjects,
  getUserOneProject,
  createProject,
  updateOwnProject
}