import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { names, descriptions, characters } from '../helpers/api';

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

export default function Characters() {

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



    const [charNames, setcharnames] = useState([]);
    const [charDescriptions, setchardescriptions] = useState([]);
    const [charList, setcharlist] = useState([]);

    const navigate = useNavigate();

    names.then((names) => setcharnames(names));
    descriptions.then((descriptions) => setchardescriptions(descriptions));
    characters.then((characters) => setcharlist(characters));

    
    console.log(charList);

    const chars = [];
    for (const char in charList) {
      //console.log(charList[char]);
      chars.push(charList[char]);
    }

    console.log(chars);


    //images.then((images) => console.log(images));
    //console.log(charNames);
    //console.log(charDescriptions);

    //const url = '';

    for (let i = 0; i < cards.length; i++) {
      //url = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${charNames[i]}_0.jpg`
    }

    const url = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${charNames[1]}_0.jpg`


    const handleDetails = () => {
      //navigate('/details');
    }

    const showCharacters = () => {
      navigate('/own');
    }

    const goChat = () => {
      navigate('/chat');
    }

    return (
        <ThemeProvider theme={theme}>
          <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              League of Legends 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Web con información sobre todos los campeones de League of Legends, donde podrás comentar lo que quieras con otros jugadores y guardar tus propios campeones.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={showCharacters}>Ver mis campeones</Button>
              <Button variant="outlined" onClick={goChat}>Ir a comentarios</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {chars.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${character.name}_0.jpg`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {character.name}
                    </Typography>
                    <Typography>
                      {character.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleDetails}>Detalles</Button>
                    <Button size="small">Editar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </main>
        </ThemeProvider>
      );
}
