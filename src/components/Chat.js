import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import MessageBox from './MessageBox';

export default function Chat() {

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    //setOpen(false);
    navigate('/');
  };  

  return (
      <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Chat no disponible
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                El chat aún no está disponible. ¡Pronto podrás hablar con otros jugadores!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
      </div>
  );
}
