import ChatIcon from '@mui/icons-material/Chat';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

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

export default function MessageBox() {

    return (
        <ChatIcon/>
    );
}
