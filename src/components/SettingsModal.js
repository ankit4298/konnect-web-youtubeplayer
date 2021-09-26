import React, {useEffect,useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';

import AlertContext from '../context/playlist/AlertContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: "20%",
    minWidth: "30%"
  },
}));

export default function SettingsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState(Cookies.get('KXUNAME'));

  const {ctxAlert,setCtxAlert} = useContext(AlertContext);

  useEffect(() => {
    
    if(props == null){
        return
    }

    if(props.openModal == true){
        handleOpen();
    }
    
}, [props.openModal])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.ModalClosed();
  };

  const handleTextchange = (e) => {
    const { name, value } = e.target;
    setUsername(value.trim());
  }

  const handleSave = () => {

    if(username == '' || username == null) {
      // alert('Please enter valid username !!!');

      setCtxAlert({
        alert: true,
        message:'Please enter valid username !!!'
      })
      return;
    }

    Cookies.set('KXUNAME', username);
    Cookies.set('KXUCHANGE', '1'); // setting user has changed
    setOpen(false);
    props.ModalClosed();
  }


  return (
    <div>
    {/* <IconButton className={classes.iconButton} aria-label="search" onClick={handleOpen}>
        <SettingsIcon/>
    </IconButton> */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">KonnectX Account</h2>
            <p id="transition-modal-description">
                <TextField id="standard-basic" label="Username" value={username} onChange={handleTextchange} />
            </p>
            <p>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </p>
            <p>
              ** Playlist will be saved/fetched based on the username
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
