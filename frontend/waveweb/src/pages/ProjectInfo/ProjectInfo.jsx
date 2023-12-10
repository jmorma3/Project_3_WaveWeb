import "./ProjectInfo.css"


import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserOneProject } from "../../services/projectService"
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects"
import ChatWeb from "../../components/ChatWeb/ChatWeb"

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
            <div>ProjectInfo</div>
            <ChatWeb/>
        </>
    )
}

export default ProjectInfo