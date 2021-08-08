import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';
import {getPlaylistsIDName, saveToPlaylist} from '../services/DBService'

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
    minHeight: "20%",
    minWidth: "40%"
  },
}));

export default function PlaylistModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [playlistCards, setPlaylistCards] = useState(null);
  const [selectedMusicData, setSelectedMusicData] = useState(null);

  const handleOpen = async () => {
    setOpen(true);

    const pl = await getPlaylistsIDName();
    RenderPlaylistNames(pl);

    // const musicData = props.musicObjRef();
    // console.log(musicData);
    // setSelectedMusicData(musicData);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveAndClose = (playlistid) => {
      
    const musicData = props.musicObjRef();
    saveToPlaylist(playlistid, musicData);

    handleClose();
  }


  const RenderPlaylistNames = (list) => {

    setPlaylistCards(list.map(item=>{
        return (
            <div key={item.id} style={{padding:'10px'}}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={()=>saveAndClose(item.id)} // passing playlist id
                >
                    {item.playlistname}
                </Button>
            </div>
        )
    }));
  }


  return (
    <div>
    <IconButton className={classes.iconButton} aria-label="search" onClick={handleOpen}>
        <PlaylistAddIcon/>
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
            <h2 id="transition-modal-title">Playlists</h2>
            <p>
               {playlistCards}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
