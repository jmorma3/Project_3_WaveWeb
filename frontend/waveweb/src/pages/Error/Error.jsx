//Importaciones de librerías externas
import { Card, Button, Typography } from "@mui/material";

//Importamos componentes y estilos
import './Error.css'
import NavBarLogin from "../../components/NavBarLogin/NavBarLogin";

// Importamos las imágenes 
import errorImage from '../../assets/not-found.jpg';

const Error = () => {
  return (
    <>
      <div className="water-background">
      <NavBarLogin />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '40px 0px'}}>
        <Card className="polaroid" >
          <img
            src={errorImage}
            alt="Error"
            className="card-image"
          />
          <div className="text-content">
            <Typography variant="h5">
              Sorry, wave not found...
            </Typography>
          </div>
        </Card>
        <Button
          variant="contained"
          href="/"
                    sx={{
            borderRadius: '25px',
            padding: '1px 10px',
            width: '150px',
          }} >
          <Typography variant="button">
            Go home
          </Typography>
        </Button>
      </div>
      </div>
    </>
  )
}

export default Error