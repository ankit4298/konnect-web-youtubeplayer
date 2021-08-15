import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

useEffect(() => {
    if(props == null){
        return
    }

    setOpen(props.openModal);
    
}, [props.openModal])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.ModalClosed();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      
    style={{
        width:'100% !important'
    }}
      >
        <DialogTitle id="alert-dialog-title">{props.headerText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.negativeAction} color="primary">
            {props.negativeButtonText}
          </Button>
          <Button onClick={props.positiveAction} color="secondary" autoFocus>
            {props.positiveButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}