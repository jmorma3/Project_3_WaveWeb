import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Typography } from "@mui/material";

import "./ToggleNewProjects.css"

export default function ToggleNewProjects() {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      color="primary"
      size="medium"
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      sx={{
        borderRadius: '25px',
        padding: '1px 20px',
        backgroundColor: 'black', // Fondo negro
        color: 'white', // Texto en blanco
        '&:hover': {
          backgroundColor: 'darkgray', // Color al pasar el mouse (opcional)
        },
      }}
    >
      <Typography 
        margin="0px 10px" 
        variant="body2" 
        sx={{ color: 'white' }} // Texto en blanco
      >
        Accept new Projects?
      </Typography>
      {selected ? (
        <ToggleOffIcon sx={{ ml: "10px", color: 'white' }} /> // Icono en blanco
      ) : (
        <ToggleOnIcon sx={{ ml: "10px", color: 'white' }} /> // Icono en blanco
      )}
    </ToggleButton>
  );
}
