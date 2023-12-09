import { createBrowserRouter } from "react-router-dom";

//Importamos el layout ("Root"):
import Root from "../layout";

//Importamos las diferentes páginas que usaremos:
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProjectDashboard from "../pages/ProjectDashboard/ProjectDashboard";


//Creamos el router principal, que contendrá los diferentes endpoints:
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/myProjects", 
                element: <ProjectDashboard/>, 
                children: [
                    {
                        path: "/myProjects/:projectId",
                        element: <ProjectDashboard/>  
                    }
                ]
            }
        ]
    }
])

export default router