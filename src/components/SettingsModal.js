import React, {useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: "200px",
    minWidth: "400px"
  },
}));

export default function SettingsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const [username, setUsername] = useState(Cookies.get('KXUNAME'));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextchange = (e) => {
    const { name, value } = e.target;
    setUsername(value.trim());
  }

  const handleSave = () => {
    Cookies.set('KXUNAME', username);
    setOpen(false);
  }

  return (
    <div>
    <IconButton className={classes.iconButton} aria-label="search" onClick={handleOpen}>
        <SettingsIcon/>
    </IconButton>

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
            <h2 id="transition-modal-title">KonnectX Username</h2>
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
