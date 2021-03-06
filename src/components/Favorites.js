import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getFavCharacters, deleteFavCharacterById } from '../firebase/firebase';


import { AuthContext } from '../context/AuthProvider';

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

export default function OwnCharacters() {

    const { user } = useContext(AuthContext);

    const [characters, setcharacters] = useState([]);

    const [showDetails, setshowdetails] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getFavCharacters( async (snapshot)=>{
            const newCharactersPromise = snapshot.docs.map(async (doc)=> {
            return {id:doc.id, ...doc.data()};
          });
          const list = await Promise.all(newCharactersPromise);
          setcharacters(list);
        });
      }, [])

    //images.then((images) => console.log(images));
    //console.log(characters);

    const handleDetails = (id) => {
      if (showDetails){
        setshowdetails(false)
      } else{
        setshowdetails(true)
      }
    }

    const showAllCharacters = () => {
      navigate('/')
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
              Favoritos
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Aquí se muestran todos los personajes que has marcado como favoritos.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={showAllCharacters}>Ver todos los campeones</Button>
              <Button variant="outlined" onClick={goChat}>Ir a comentarios</Button>
            </Stack>
          </Container>
        </Box>
        <Button size="small" onClick={handleDetails}><InfoIcon/> Mostrar vista completa</Button>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {characters.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4}>
                {user.uid == character.uid ?
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${character.name}_0.jpg`}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {character.name}
                      </Typography>
                      <Typography>
                        {character.title}
                      </Typography>
                      {showDetails ?
                        <Typography gutterBottom variant="h5" component="h2" >
                          <Typography gutterBottom variant="h5" component="h2">
                            Descripción: <br/>
                            <Typography>
                              {character.description}
                            </Typography>
                          </Typography>
                        </Typography>
                        :
                        <></>
                      }
                    </CardContent>
                  </Card>
                  :
                  console.log("vacio")
                }
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
        </main>
        </ThemeProvider>
    );
}