import { createBrowserRouter } from "react-router-dom";

//Importamos el layout ("Root"):
import Root from "../layout";

//Importamos las diferentes páginas que usaremos:
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";


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
        ]
    }
])

export default router