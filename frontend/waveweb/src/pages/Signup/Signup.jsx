//Importaciones de librerías externas
import { Box, Card, Typography, Button, Link, Avatar } from '@mui/material';
import WavesIcon from "@mui/icons-material/Waves";

//Importamos componentes y estilos
import "./Signup.css"

//Importamos imágenes
import signupImage from '../../assets/signup.jpg';
import backgroundImage from "../../assets/login-wave.png"

const SignUp = () => {
  return (
    <div className="loginForm-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <div className='logo-name'>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                margin: '10px',
                width: 56,
                height: 56
              }}>
              <WavesIcon />
            </Avatar>
          </Link>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold' }}>
            WAVE WEB
          </Typography>
        </div>

        <div className='sign-container'>
          <Card className="polaroid" >

            <img
              src={signupImage}
              alt="SignUp"
              className="card-image" />

            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom>
              Start your digital journey with just a few clicks. Fill out a brief form to outline your goals, choose the plan that boosts your business type, and take the first step towards a tailored digital transformation with Wave Web.
            </Typography>
          </Card>
        </div>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 1
          }}>
          <Button
            variant="contained"
            href="/signupForm"
            color="primary"
            sx={{
              borderRadius: '25px',
              padding: '1px 20px'
            }}>
            Shall we start?
          </Button>
        </Box>
        <Typography
          align="center"
          sx={{ mt: 1 }}>
          Do you already have an account?{' '}
          <Link
            href="/login"
            variant="body2"
            sx={{
              textDecoration: 'underline',
              color: 'primary.main'
            }}>
            Log IN
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default SignUp;
