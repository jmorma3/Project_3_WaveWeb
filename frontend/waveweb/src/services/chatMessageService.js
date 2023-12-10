import api from "./config";


const getProjectMessages = async (projectId) => {
    try {
        const { data } = await api.get(`/message/myMessages/${projectId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        return data.chatMessages
    } catch (error) {
        return error
    }
}

const sendNewChatMessage = async (project_Id, messageBody) => {
    try {
      const { data } = await api.post("/message", {
        projectId: project_Id,
        message_text: messageBody,
        message_date: "2023-12-10",
        message_time: "19:57",
        userId: parseInt(localStorage.getItem("userId"))
      }, {
        headers: {
            authorization: localStorage.getItem('token')
        }
      });
  
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error; // Re-lanza el error para que puedas manejarlo en la llamada a la función
    }
  };

export {
    getProjectMessages,
    sendNewChatMessage
}