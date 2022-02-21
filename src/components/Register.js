import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import { useContext, useState } from 'react';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { register, updateName, auth, provider } from '../firebase/firebase';

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

export default function Register() {

    const { user, setUser } = useContext(AuthContext);
    const [validEmail, setvalidemail] = useState(true);
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (emailPattern.test(data.get('email'))) {
            register(data.get('email'), data.get('password'))
            .then(
                (userCredentials) => {
                    setUser(userCredentials.user);
                    console.log(data.get('userName'))
                    updateName({displayName: data.get('userName')})
                    .then(()=>{})
                    .catch((err)=>{console.log(err)})
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
        } else {
            console.log("error")
            setvalidemail(false)
        }
        setvalidemail(false)        
    };

    const handleGoogle = (event) => {
        event.preventDefault();
        //const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // Sign in with Google
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };

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
                    Crear cuenta
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="userName"
                        label="Nombre de usuario"
                        name="userName"
                        autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Crear cuenta
                    </Button>
                    {validEmail ?
                        <></>
                        :
                        <Alert severity="error">Correo no válido o registrado</Alert>
                    }
                    <Grid container justifyContent="center">
                        <Typography component="h1" variant="h5">
                            Inicia sesión con Google
                        </Typography>
                        <Grid item >
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                sx={{ mt: 3, mb: 10 }} 
                                onClick={handleGoogle}
                            >
                                <GoogleIcon/>
                            </Button>
                            <Link component={RouterLink} to="/login" variant="body2">
                                ¿Tiene una cuenta? Inicia sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Grid>
        </Grid>
        </ThemeProvider>
    );
}