import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, TextField, Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

const theme = createTheme();

export default function Profile() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEdit = () => {
        // edit profile
    }

    const handlePassword = () =>{
        navigate('/reset')
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
            
    </ThemeProvider>
    );
}