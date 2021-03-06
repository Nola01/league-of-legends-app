import * as React from 'react';
import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import { red, yellow } from '@mui/material/colors';

import { AuthContext } from '../context/AuthProvider';
import { logout } from '../firebase/firebase';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function Home() {
  const [userMenu, setusermenu] = useState(null);
  const [open, setOpen] = useState(false);
  const { loggedIn, user } = useContext(AuthContext);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const [selectAdd, setselectadd] = useState(false);
  const [selectOwn, setselectown] = useState(false);
  const [selectFav, setselectfav] = useState(false);

  const handleLogout = () => {
      if(loggedIn) {
        logout();
      }
  }

  const handleHome = () => {
    navigate('/');
  }

  const handleUserMenu = (event) => {
    setusermenu(event.currentTarget);
  }

  const handleProfile = () => {
    setusermenu(null);
    navigate('/profile');
  }

  const handleClose = () => {
    setusermenu(null);
  }

  const handleNewCharacter = () => {
    setselectfav(false)
    setselectown(false)
    setselectadd(true)
    navigate('/new');
  }

  const handleOwnCharacters = () => {
    setselectfav(false)
    setselectadd(false)
    setselectown(true)
    navigate('/own');
  }

  const handleFavCharacters = () => {
    setselectadd(false)
    setselectown(false)
    setselectfav(true)
    navigate('/favorites');
  }

  const handleChat = () => {
    setselectfav(false)
    setselectadd(false)
    setselectown(false)
    navigate('/chat');
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{ background: '#0a0a0a' }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              League of Legends App
            </Typography>
            <IconButton color="inherit" onClick={handleHome}>
              <HomeIcon/>
            </IconButton>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={userMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userMenu)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>{user.displayName || "An??nimo"}</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesi??n</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List>
            <ListItem button key="A??adir Personaje" onClick={handleNewCharacter}>
              {selectAdd ?
                <ListItemIcon>
                  <AddCircleIcon/>
                </ListItemIcon> 
                :
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon> 
              }
              <ListItemText primary="A??adir personaje" />
            </ListItem>
            <ListItem button key="Personajes creados" onClick={handleOwnCharacters}>
              {selectOwn ?
                <ListItemIcon sx={{ color: yellow[800] }}>
                  <StarIcon/>
                </ListItemIcon>
                :
                <ListItemIcon>
                  <StarBorderIcon/>
                </ListItemIcon>
              }
              <ListItemText primary="Personajes creados" />
            </ListItem>  
            <ListItem button key="Favoritos" onClick={handleFavCharacters}>
              {selectFav ?
                <ListItemIcon sx={{ color: red[500] }}>
                  <FavoriteIcon/>
                </ListItemIcon>
                :
                <ListItemIcon>
                  <FavoriteIcon/>
                </ListItemIcon>
              }
              <ListItemText primary="Favoritos" />
            </ListItem>       
            <ListItem button key="Chat" onClick={handleChat}>
              <ListItemIcon>
                <ChatIcon/>
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>    
          </List>
          <Divider />
          <List>
            <ListItem button key="Cerrar sesi??n" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary="Cerrar sesi??n" />
            </ListItem>     
          </List>
          <List component="nav">
            
            <Divider sx={{ my: 1 }} />
            
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <Home />;
}
