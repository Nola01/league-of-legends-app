import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, TextField, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AuthContext } from '../context/AuthProvider';

const theme = createTheme();

export default function Profile() {

    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };  

    const handleEdit = () => {
        // edit profile
        setOpen(true);
    }

    const handlePassword = () =>{
        //navigate('/reset')
        setOpen(true);
    }

    return (
    <ThemeProvider theme={theme}>
        <Box 
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 5
            }}
        >
            <Avatar alt="Remy Sharp" sx={{ width: 120, height: 120 }}/>
            <Box
                component="form" sx={{ mt: 1, padding: 3 }}
            >
                <TextField
                    id="outlined-read-only-input"
                    label="Nombre de usuario"
                    defaultValue={user.displayName}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                
            </Box>
            <Box
                component="form" sx={{ mt: 1 }}
            >
                <TextField
                    id="outlined-read-only-input"
                    label="Correo electrónico"
                    defaultValue={user.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>  
            <Box
                component="form" sx={{ mt: 1, padding: 5 }}
            >
                <Button variant="contained" component="span" onClick={handleEdit} sx={{ marginRight: 2 }}>
                    Editar
                </Button>
                <Button variant="contained" component="span" onClick={handlePassword}>
                    Reestablecer contraseña
                </Button>
            </Box>             
        </Box>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Función no disponible
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Esta función aún no está disponible. ¡Disculpe las molestias!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                Aceptar
                </Button>
            </DialogActions>
        </Dialog>
            
    </ThemeProvider>
    );
}