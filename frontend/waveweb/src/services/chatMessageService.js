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

const sendNewChatMessage = async (projectId, messageBody) => {
    
    try {
        const {data} = await api.post("/message",
            {
                projectId: projectId,
                message_text: messageBody,
                message_date: "today",
                message_time: "right now",
                userId: parseInt(localStorage.getItem("userId"))
            })

       console.log(data)
       return data

    } catch (error) {
        console.log(error.message);

    }
};

export {
    getProjectMessages,
    sendNewChatMessage
}