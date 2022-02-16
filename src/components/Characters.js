import './Characters.css'
import { useState, useContext, useEffect } from 'react';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { uploadImage, addFavCharacter, getFavCharacters, getImageUrl, deleteFavCharacterById } from '../firebase/firebase';
import { characters, getCharacterById } from '../helpers/api';
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

export default function Characters() {

    const [firebaseFavCharList, setfavcharlist] = useState([]);
    const [charList, setcharlist] = useState([]);
    const [favCharactersNames, setfavcharactersnames] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
      getFavCharacters( async (snapshot)=>{
          const newCharactersPromise = snapshot.docs.map(async (doc)=> {
          return {id:doc.id, ...doc.data()};
        });
        const list = await Promise.all(newCharactersPromise);
        setfavcharlist(list);
        
      });
    }, [])

    const firebaseFavListNames = [];
    firebaseFavCharList.forEach((character) => {
      firebaseFavListNames.push(character.name)
    })

    

    

    //const favCharacters = [];

    const navigate = useNavigate();

    characters.then((characters) => setcharlist(characters));

    //console.log(charList);

    const chars = [];
    for (const char in charList) {
      //console.log(charList[char]);
      chars.push(charList[char]);
    }

    //console.log(chars);

    const [favIcon, setfavicon] = useState(false);

    const handleDetails = (id) => {
      //navigate('/details');
      //console.log(character);
    }

    const handleFavorites = (id) => {
      //console.log(id);
      if (favIcon) {
        setfavicon(false);
      } else {
        setfavicon(true);
      }
      
      if (! favCharactersNames.includes(id)) {
        setfavcharactersnames(...[favCharactersNames], favCharactersNames.push(id))
        addFavorites();
      } else {
        const index = favCharactersNames.indexOf(id);
        removeFavorites(id);
        setfavcharactersnames(...[favCharactersNames], favCharactersNames.splice(index, 1))
      }
      //console.log(firebaseFavListNames)
      //console.log(favCharactersNames)      
    }


    const addFavorites = async () => {
      favCharactersNames.forEach((id) => {
        if (!firebaseFavListNames.includes(id)){
          console.log(id)
          getCharacterById(id).then((character) => {
            console.log(character)
            let category = '';
            switch(character.tags[0]) {
              case 'Mage':
                category = 'Mago';
                break;
              case 'Assassin':
                category = 'Asesino';
                break;
              case  'Tank':
                category = 'Tanque';
                break;
              case 'Support':
                category = 'Soporte';
                break;
              case 'Marksman':
                category = 'Tirador';
                break;
              case 'Fighter':
                category = 'Luchador';
                break;
              default:
                category = 'Desconocido';  
            }
            try {
              const doc = {
                uid : user.uid,
                name: character.name,
                category: category,
                title: character.title,
                description: character.blurb,
                image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${character.id}_0.jpg`
              }
              addFavCharacter(doc).then(() => console.log('Personaje añadido'));
            } catch (error) {
              console.log("Error al guardar personaje");
            }
          }); 
        } else {
          console.log("El personaje ya esta añadido a favoritos");
        } 
      })
    }

    const removeFavorites = async (id) => {
      try {
        const charToDel =  firebaseFavCharList.find((character) => character.name == id);
        //console.log(charToDel)
        deleteFavCharacterById(charToDel.id);
        console.log("Personaje borrado", id);
      } catch (error) { 
        console.log("Error al borrar personaje");
      }
    }

    const showOwnCharacters = () => {
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
              Web con información sobre todos los campeones de League of Legends, donde podrás guardar los tuyos propios y comentar lo que quieras con otros jugadores.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={showOwnCharacters}>Ver mis campeones</Button>
              <Button variant="outlined" onClick={goChat}>Ir a comentarios</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="0" className='characters'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {chars.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  className='card'
                >
                  <CardMedia
                    component="img"
                    image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${character.id}_0.jpg`}
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
                    <Button size="small" onClick={handleDetails(character.id)}>Detalles</Button>
                    {favCharactersNames.includes(character.id) && firebaseFavListNames.includes(character.id) ?
                      <Button size="small" onClick={()=>handleFavorites(character.id)}><FavoriteIcon sx={{ color: red[500] }}/></Button>
                      :
                      <Button size="small" onClick={()=>handleFavorites(character.id)}><FavoriteBorderIcon sx={{ color: red[500] }}/></Button>
                    }
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


