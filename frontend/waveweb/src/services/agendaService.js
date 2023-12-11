import api from "./config";

const createNewMeeting = async (project_Id, client_Id, newMeetingDate, newMeetingTime) => {
    try {
        const { data } = await api.post(`/agenda/myAgenda/${project_Id}`, {
            projectId: project_Id,
            meeting_date: newMeetingDate,
            clientId: client_Id,
            meeting_time: newMeetingTime,
            devId: parseInt(localStorage.getItem("userId"))
        }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        });

        return data;

    } catch (error) {
        console.log(error);
    }
};

export {
    createNewMeeting
}