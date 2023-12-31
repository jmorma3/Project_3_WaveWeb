import { createBrowserRouter } from "react-router-dom";

//Importamos el layout ("Root"):
import Root from "../layout";

//Importamos las diferentes páginas que usaremos:
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import MyProjects from "../pages/MyProjects/MyProjects";
import ProjectInfo from "../pages/ProjectInfo/ProjectInfo";
import SignupForm from "../pages/SignupForm/SignupForm";
import Admin from "../pages/Admin/Admin";
import Admin_User_Info from "../pages/Admin_User_Info/Admin_User_Info";
import Admin_Project_Info from "../pages/Admin_Project_Info/Admin_Project_Info";


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
                path: "/signupForm",
                element: <SignupForm />
            },            
            {
                path: "/myProjects",
                element: <MyProjects />
            },
            {
                path: "/myProjects/:projectId",
                element: <ProjectInfo />
            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/admin/user/:userId",
                element: <Admin_User_Info />
            }, 
            {
                path: "/admin/project/:projectId",
                element: <Admin_Project_Info />
            }


        ]
    }
])

export default router