import './App.css'

//Aquí simplemente le pasaremos el RouterProvider, que proporcionará las diferentes routes que tenemos creadas en el "index.jsx" de "router":
import { RouterProvider } from 'react-router-dom'
//Seguidamente, nos taemos la variable "router", dándole el nombre "config":
import config from "./router"

function App() {

  return (
    <>
      {/* y sería el prop "router" que le pasamos al RouterProvider: */}
      <RouterProvider router={config} />
    </>
  )
}

export default App