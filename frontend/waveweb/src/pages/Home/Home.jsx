
import "./Home.css"
import { getAllUsers } from "../../services/userService"

import { useState, useEffect } from "react"

//Importamos componentes:
import NavBar from "../../components/NavBar/NavBar"


const Home = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllUsers()
            setUsers(result)
        }
        fetchData()
    }, [])

    const displayUsers = () => {
        const result = users.map((user) => {
            return (
                <div key={user.id}>
                    {user.first_name}
                </div>
            )
        })
        return result
    }

    return (
        <>
            <NavBar />
            <div>Esta es la Home!</div>
            {/* {displayUsers()} */}
        </>

    )
}

export default Home