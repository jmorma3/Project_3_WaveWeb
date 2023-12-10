import "./MyProjects.css"

import { useState, useEffect } from "react"

//Importamos los componentes:
import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects"
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { getUserProjects } from '../../services/projectService'

const MyProjects = () => {

    const [userProjects, setUserProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserProjects()
            setUserProjects(result)
        }
        fetchData()
    }, [])

    const displayUserProjects = () => {
        const result = userProjects.map(project => {
            return (
                <ProjectCard key={project.id} data={project} />
            )
        })
        return result
    }

    return (
        <>
            <NavBarMyProjects />

            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}}>

                    {userProjects.length > 0 ? displayUserProjects() : console.log("loading")} 

            </div>
        </>


    )
}

export default MyProjects