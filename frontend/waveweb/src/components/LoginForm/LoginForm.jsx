// Importaciones de librerías externas
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importamos los servicios
import { login } from "../../services/authService";
import { getUserOneProject, getUserProjects } from "../../services/projectService";

// Importaciones de componentes de Material UI
import {
  Card,
  CardHeader,
  TextField,
  CardContent,
  Divider,
  Button,
  CardActions,
  Typography
} from "@mui/material";

// Importamos estilos
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const payload = {
        email,
        password
      };
      const result = await login(payload);

      if (result === 200) {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "dev") {
          navigate('/myProjects');
        } else if (userRole === "client") {
          const projects = await getUserProjects();
          if (projects && projects.length > 0) {
            const project = await getUserOneProject(projects[0].id);
            navigate(`/myProjects/${project.id}`);
          }
        } else if (userRole === "admin") {
          navigate('/admin');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginForm-container">
      <Card
        sx={{
          width: "50%",
          padding: "30px",
          margin: "auto"
        }}>
        <CardHeader title="Log in to your account" />

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

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "30px"
          }}>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              marginRight: "10px",
              borderRadius: '25px',
              padding: '1px 20px'
            }}>
            Login
          </Button>
          <Button
            variant="contained"
            href="/signup" sx={{
              borderRadius: '25px',
              padding: '1px 20px'
            }}>
            Sign Up
          </Button>
        </CardActions>
        <Divider />
        <Typography
          variant="h6"
          component="a"
          href="/">
          Forgot your password?
        </Typography>
      </Card>
    </div>
  );
}

export default LoginForm;
