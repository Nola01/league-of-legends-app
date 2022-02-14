import { useState, useEffect } from 'react';
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
import { getImageUrl, getCharacters } from '../firebase/firebase';


import { names, descriptions } from '../helpers/api';

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

    const [characters, setcharacters] = useState([]);

    useEffect(() => {
        getCharacters( async (snapshot)=>{
            const newCharactersPromise = snapshot.docs.map(async (doc)=> {
            const imageName = doc.data().image;
            const url = await getImageUrl(imageName);
            return {id:doc.id, ...doc.data(), image: url};
          });
          const list = await Promise.all(newCharactersPromise);
          setcharacters(list);
        });
      }, [])

    //images.then((images) => console.log(images));
    console.log(characters);

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
              Mis personajes
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Aquí se muestran todos los personajes que has añadido.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Ver todos los campeones</Button>
              <Button variant="outlined">Ir a comentarios</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {characters.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={character.image && character.image !== '' ? character.image : 'https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672'}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {character.name}
                    </Typography>
                    <Typography>
                      {character.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Detalles</Button>
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
