import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';

import {createPlaylist, updatePlaylistByID} from '../services/DBService'

import AlertContext from '../context/AlertContext';
import UserContext from '../context/UserContext';

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

export default function CreatePlaylistModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    
    const {ctxAlert,setCtxAlert} = useContext(AlertContext);
    const userContext = useContext(UserContext);
    
    const [playlistName, setPlaylistName] = useState('');
    const [username, setUsername] = useState(null);
    useEffect(()=>{
        if(userContext != null && userContext.ctxFirebaseUser != null){
            setUsername(userContext.ctxFirebaseUser.uid);
        }
    },[userContext])

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
        setPlaylistName(value.trim());
    }

    const handleSave = async () => {
        // create new playlist in DB
        try{

            if(username == null || username == '') {
                // alert('Please enter username from My Account !!!');
                
                setCtxAlert({
                    alert: true,
                    message:'Please enter username from My Account !!!'
                })
                return;
            }

            if(playlistName == '' || playlistName == null){
                // alert('Please enter valid Playlist name !!!');
                
                setCtxAlert({
                    alert: true,
                    message:'Please enter valid Playlist name !!!'
                })
                return;
            }

            const data = await createPlaylist(username, playlistName);
            if(data != null){
                // alert('Playlist Created successfully');
                
                setCtxAlert({
                    alert: true,
                    message:'Playlist Created successfully !!!'
                })
            }

            // Update newly created playlist with data from "withQueueList" with playlist id from "data"
            if(props.withQueueList !== undefined && props.withQueueList !== null){
                // console.log('Save Queue as Playlist');
                const _playlistUpdated = await updatePlaylistByID(data, props.withQueueList);
                if(_playlistUpdated != null) {
                    // console.log("Updated Playlist");

                    setCtxAlert({
                        alert: true,
                        message:'Playlist updated successfully !!!'
                    })
                }
            }

            setOpen(false);
            setPlaylistName('');
            props.ModalClosed();

        }catch(e){
            console.log(e);
        }
    }

    return (
        <div>

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
                <h2 id="transition-modal-title">Create Playlist</h2>
                <p>{props.withQueueList!==undefined && props.withQueueList!==null ? `(${props.withQueueList.length} tracks)` : null}</p>
                <p id="transition-modal-description">
                    <TextField id="standard-basic" label="Playlist name" value={playlistName} onChange={handleTextchange} />
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
            </div>
            </Fade>
        </Modal>
        </div>
    );
}