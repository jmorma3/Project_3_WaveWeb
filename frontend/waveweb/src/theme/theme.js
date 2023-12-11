import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#000000', // Botones y componentes primarios en negro
        },
        secondary: {
          main: '#f50057', // Color secundario, ajusta según tu preferencia
        },
        text: {
          primary: '#000000', // Texto principal en negro para contraste con fondo claro
          secondary: 'rgba(0, 0, 0, 0.7)', // Texto secundario en un negro menos prominente
        },
        action: {
          active: '#000000', // Texto del botón activo en negro
          hover: 'rgba(0, 0, 0, 0.04)', // Sombra al pasar el mouse por encima del botón
          selected: 'rgba(0, 0, 0, 0.08)', // Fondo del botón al estar seleccionado
          disabled: 'rgba(0, 0, 0, 0.26)', // Texto del botón al estar deshabilitado
          disabledBackground: 'rgba(0, 0, 0, 0.12)', // Fondo del botón al estar deshabilitado
        },
  },
});
export default theme;


