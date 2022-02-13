import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';

import { addCharacter, uploadImage } from '../firebase/firebase';

export default function NewCharacter() {

    const initialValues = {
        name: "",
        category: "",
        description : "",
        image : ""
    }

    const [values, errors, onChangeField, onChangeFileField, isValid ]= useForm(initialValues);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isValid()) {
          try {
            const image = await uploadImage(values.image[0]);
            const doc = {
              name: values.name,
              category: values.category,
              description: values.description,
              image: values.image[0].name 
            }
            await addCharacter(doc);
            console.log('Personaje añadido');
            navigate('/');
          } catch (error) {
            //TODO Muchos errores posibles por tratar.
            console.log(error)
          }
        }
    };

    const Input = styled('input')({
        display: 'none',
    });

    return (
        <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Nuevo personaje
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <MenuItem value={3}>Tanque</MenuItem>
                    <MenuItem value={4}>Soporte</MenuItem>
                    <MenuItem value={5}>Tirador</MenuItem>
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
            <Button
              type="submit"
              fullWidth
              disabled={!isValid()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}