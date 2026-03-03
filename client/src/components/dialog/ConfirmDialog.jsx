import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
const ConfirmDialog = ({ open, handleClose, confirmAction, promptText  }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {/* <DialogTitle id='alert-dialog-title'>Logout</DialogTitle> */}
      <DialogContent>
        <DialogContentText
          fontSize={18}
          color='black'
                  id='alert-dialog-description'
             
        >
          {promptText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleClose}>
          No
        </Button>
        <Button
          color='error'
          variant='contained'
          onClick={confirmAction}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
