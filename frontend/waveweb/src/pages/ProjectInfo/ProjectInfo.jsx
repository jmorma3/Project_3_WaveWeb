import "./ProjectInfo.css"


import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserOneProject } from "../../services/projectService"
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects"
import ChatWeb from "../../components/ChatWeb/ChatWeb"
import ProjectInfoCard_Client from "../../components/ProjectInfoCard_Client/ProjectInfoCard_Client"
import ProjectInfoCard_Dev from "../../components/ProjectInfoCard_Dev/ProjectInfoCard_Dev"

const ProjectInfo = () => {

    const { projectId } = useParams()

    const [userOneProject, setUserOneProject] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserOneProject(projectId)
            setUserOneProject(result)
        }
        fetchData()
    }, [])

    return (
        <>
            <NavBarMyProjects />

            {/* En función del "role" del usuario logeado, podrá ver una ProjectInfoCard u otra: */}
            {localStorage.getItem("userRole") === "client" ? <ProjectInfoCard_Client data={userOneProject} /> : <ProjectInfoCard_Dev data={userOneProject}/>}
            
            <ChatWeb />
        </>
    )
}

export default ProjectInfo