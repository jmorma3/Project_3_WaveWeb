import "./NavBar.css"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import WavesIcon from "@mui/icons-material/Waves";

const pages = ['About Us', 'FAQ'];

function NavBar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

          {/* Ícono y Título - Izquierda */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WavesIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Wave Web
            </Typography>
          </Box>

          {/* Botones - Derecha */}
          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button variant="contained" href="/about">
              About Us
            </Button>
            <Button variant="contained" href="/login">
              Log In
            </Button>
            <Button variant="contained" href="/signup">
              Sign Up
            </Button>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;