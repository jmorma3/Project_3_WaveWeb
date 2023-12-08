import "./LoginForm.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardHeader,
  TextField,
  CardContent,
  Divider,
  Button,
  CardActions
} from "@mui/material"

//Importamos los servicios:
import { login } from "../../services/authService"

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const payload = {
        email,
        password
      }
      const result = await login(payload)
      if (result === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ width: "50%" }}>
      <CardHeader title="Iniciar Sesión" />
      <CardContent>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          fullWidth={true}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          fullWidth={true}
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        
        <Button color="success" onClick={ handleClick }>
          Login
        </Button>
      </CardActions>
      <CardHeader title="¿Olvidaste tu contraseña?" />
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button color="success" onClick={ handleClick }>
          Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default LoginForm;