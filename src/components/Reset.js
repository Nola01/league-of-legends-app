import { useContext, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FaceIcon from '@mui/icons-material/Face';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { resetPassword } from '../firebase/firebase';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.riotgames.com/es">
            Riot Games
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Reset() {

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    resetPassword(data.get('email')).then(
      ()=>{
        setOpen(true);
        setUser(null);
      }
    );
  }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(login_logo.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor:'whitesmoke'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
              <FaceIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reestablecer Contraseña
            </Typography>
            <Typography component="p" align="justify" sx={{mt:2}}>
              Escriba su dirección de correo electrónico. Se le enviará un enlace para recuperar su contraseña.
            </Typography> 
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reestablecer Contraseña
              </Button>
              <Link component={RouterLink} to="/login" variant="body2">
                Volver
              </Link>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Reestablecer Contraseña
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                El email para el restablecimiento de la contraseña ha sido enviado correctamente.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}