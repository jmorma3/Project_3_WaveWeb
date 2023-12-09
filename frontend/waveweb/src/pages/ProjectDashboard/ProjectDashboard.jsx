import React from 'react'

//Importamos los componentes:
import NavBarDashboard from "../../components/NavBarDashboard/NavBarDashboard"
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import ClientContactCard from '../../components/ClientContactCard/ClientContactCard'
import ChatWeb from '../../components/ChatWeb/ChatWeb'
import Agenda from '../../components/Agenda/Agenda'

const ProjectDashboard = () => {
    return (
        <>
            <NavBarDashboard />
            {/* Contenedor principal con flexbox */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* ProjectCard a la izquierda */}
                <div style={{ flex: 1}}>
                    <ProjectCard />
                    <ClientContactCard />
                </div>

                {/* ChatWeb centrado con espacio a la izquierda y derecha */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <ChatWeb />
                </div>

                {/* Agenda a la derecha con margen */}
                <div style={{ width: '300px', marginLeft: '20px', marginRight: '20px' }}>
                    <Agenda />
                </div>
            </div>
        </>


    )
}

export default ProjectDashboard