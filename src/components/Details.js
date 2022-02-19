import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, TextField, Button } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { getCharacterById } from '../helpers/api';

const theme = createTheme();

export default function Details() {

    const navigate = useNavigate();

    const [character, setcharacter] = useState([]);

    const getChar = (id) => {
      getCharacterById(id).then((character) => setcharacter(character))
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
                         
        </Box>
            
    </ThemeProvider>
    );
}
