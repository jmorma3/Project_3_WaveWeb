import "./ToggleNewProjects.css"

import ToggleButton from '@mui/material/ToggleButton';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Typography } from "@mui/material";

import { useState } from "react";

export default function ToggleNewProjects() {
  const [selected, setSelected] = useState(true);

  return (
    <ToggleButton
    color= "primary"
    size= "medium"
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <Typography margin="0px 10px" variant="h6" >
                        Accept new Projects?
                    </Typography>
      {selected ? <ToggleOnIcon sx={{ml: "10px"}}/> : <ToggleOffIcon sx={{ml: "10px"}}/>}
    </ToggleButton>
  );
}