import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getImageUrl, getCharacters, deleteCharacterById, addCharacter, uploadImage, updateCharacterById } from '../firebase/firebase';
import { AuthContext } from '../context/AuthProvider';
import useForm from '../hooks/useForm';


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

    const [open, setOpen] = useState(false);

    const [updateId, setupdateid] = useState(0);

    const navigate = useNavigate();

    const initialValues = {
      uid: "",
      name: "",
      category: "",
      description : "",
      image : ""
  }

  const [values, errors, onChangeField, onChangeFileField, isValid ]= useForm(initialValues);

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
    //console.log(characters);

    const handleDetails = (id) => {
      navigate('/details');
      console.log(id)
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleEdit = (id) => {
      setupdateid(id);
      let charToEdit = {};
      characters.forEach((char) => {
        if (char.id == id) {
          charToEdit = char
        }
        //console.log(char.id)
      })
      console.log(charToEdit)
      setOpen(true);
    }

    const handleSubmit = async (event) => {
      console.log(event.target.value)
      event.preventDefault();
        if (isValid()) {
          try {
            const image = await uploadImage(values.image[0]);
            const doc = {
              uid : user.uid,
              name: values.name,
              category: values.category,
              description: values.description,
              image: values.image[0].name 
            }
            console.log(values.name)
            console.log(values.category)
            console.log(values.description)
            console.log(values.image[0].name)
            await updateCharacterById(updateId, doc);
            console.log('Personaje añadido');
            //console.log(values.image[0])
            //console.log(values.image[0].name)
            //console.log(defaultImage.name)
            navigate('/own');
          } catch (error) {
            //TODO Muchos errores posibles por tratar.
            console.log(error)
          }
        }
        setOpen(false);
    };

    const Input = styled('input')({
      display: 'none',
    });

    const handleDelete = (id) => {
      console.log(id)
      try {
        deleteCharacterById(id);
        console.log("Personaje borrado", id);
      } catch (error) {
        console.log("Error al borrar personaje");
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
              <Button variant="contained" onClick={showAllCharacters}>Ver todos los campeones</Button>
              <Button variant="outlined" onClick={goChat}>Ir a comentarios</Button>
            </Stack>
          </Container>
        </Box>
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
                      <Button size="small" onClick={()=>handleDetails(character.id)}><InfoIcon/></Button>
                      <Button size="small" onClick={()=>handleEdit(character.id)}><EditIcon/></Button>
                      <Button size="small" onClick={()=>handleDelete(character.id)}><DeleteIcon/></Button>
                    </CardActions>
                  </Card>
                  :
                  console.log('vacio')
                }
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ pt: 4 }} />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Editar
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value = {values.name}
                    onBlur = {onChangeField}
                    onChange = {onChangeField}
                    id="email"
                    label="Nombre"
                    name="name"
                    autoFocus
                    {...(errors['name'] && { error: true, helperText: errors['name'] })}
                  />
                  <FormControl fullWidth >
                    <InputLabel id="category">Categoría</InputLabel>
                    <Select
                        labelId="category"
                        required
                        fullWidth
                        id="categoria"
                        label="Categoría"
                        name="category"
                        onBlur = {onChangeField}
                        value={values.category}
                        onChange={onChangeField}
                        {...(errors['category'] && {error: true})}
                        >
                        <MenuItem value={1}>Mago</MenuItem>
                        <MenuItem value={2}>Asesino</MenuItem>
                        <MenuItem value={3}>Luchador</MenuItem>
                        <MenuItem value={4}>Tanque</MenuItem>
                        <MenuItem value={5}>Soporte</MenuItem>
                        <MenuItem value={6}>Tirador</MenuItem>
                    </Select>
                    {errors['category'] && <FormHelperText>{errors['category']}</FormHelperText>}
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={values.description}
                    onBlur = {onChangeField}
                    onChange={onChangeField}
                    name="description"
                    label="Descripción"
                    multiline
                    rows={4}
                    id="description"
                    {...(errors['description'] && { error: true, helperText: errors['description'] })}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" 
                        id="contained-button-file" 
                        multiple
                        name="image"
                        onChange={onChangeFileField}
                        type="file" />
                        <Button variant="contained" component="span">
                        Subir imagen
                        </Button>
                        <Typography component="span" sx={{m:1}}>
                        {values.image && values.image[0].name}
                        </Typography>
                    </label>
                  </Stack>
                
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit} autoFocus>
                Guardar
              </Button>
              <Button onClick={handleClose} autoFocus>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

        </Container>
        </main>
        </ThemeProvider>
    );
}
