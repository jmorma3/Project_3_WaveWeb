import "./Error.css"
import { Card, Button, Typography } from "@mui/material";
import errorImage from '../../assets/not-found.jpg';
import NavBarLogin from "../../components/NavBarLogin/NavBarLogin";

const Error = () => {
  return (
    <>
    <NavBarLogin/>
    <div className="error-container">
      <Card style={{ boxShadow: 'none', border: 'none' }}className="card">
        <img src={errorImage} alt="Error" className="card-image" />
        <div className="text-content">
          <Typography variant="h5">Sorry, wave not found...</Typography>
        </div>
      </Card>
      <Button variant="contained" href="/" >
        <Typography variant="button">Go home</Typography>
      </Button>
    </div>
    </>
  )
}

export default Error