import React from 'react'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function JotDeversmtService({openDialog, row}) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(openDialog)
      return () => {
        handleClose()
      }
    }, [openDialog])
    

    const valider = () => {
        ///----------
        handleClose()
    };

    const handleClose = () => {
        setOpen(false)
    };

  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Service associé</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Association d'un service de deversement au formulaire
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={valider}>valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default JotDeversmtService