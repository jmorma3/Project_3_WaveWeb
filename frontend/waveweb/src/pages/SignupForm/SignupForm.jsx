import "./SignupForm.css"
import { Typography } from '@mui/material';
import NavBarLogin from "../../components/NavBarLogin/NavBarLogin"

const SignupForm = () => {
  return (
    <>
      <NavBarLogin />
      <Typography variant="h5" align="center" gutterBottom
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}>
        SignUP Form
      </Typography>

    </>
  )
}

export default SignupForm
