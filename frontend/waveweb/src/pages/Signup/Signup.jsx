import { Box, Card, Typography, Button, Link, Avatar } from '@mui/material';
import WavesIcon from "@mui/icons-material/Waves";
import signupImage from '../../assets/signup.jpg';
import "./Signup.css"

const SignUp = () => {
  return (
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
      {/* Logo y texto */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', margin: '15px', width: 56, height: 56 }}>
          <WavesIcon />
        </Avatar>
      </Link>
      <Typography variant="h5" align="center" gutterBottom>
        WAVE WEB
      </Typography>

      {/* Card para contener el contenido y la imagen */}
      <Card sx={{ maxWidth: 700, padding: '20px', marginTop: '10px', boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Start your digital journey with just a few clicks. Fill out a brief form to outline your goals, choose the plan that boosts your business type, and take the first step towards a tailored digital transformation with Wave Web.
        </Typography>

        {/* Imagen */}
        <img src={signupImage} alt="SignUp" className="signup-image" />

        {/* Botón y enlace */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 5 }}
          >
            Shall we start?
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Do you already have an account?{' '}
          <Link href="/login" variant="body2" sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Log IN
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default SignUp;
