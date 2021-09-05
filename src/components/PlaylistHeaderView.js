import React, {useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AlertDialog from './Dialog';

import {removePlaylistByID} from '../services/DBService';
import ContainerView from './DnD/ContainerView';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '20%',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    Icon: {
      height: 38,
      width: 38,
    }
  }));

function PlaylistHeaderView(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [header, setHeader] = useState([]);
    const [dialogState, setDialogState] = useState(false);

    // fires when playlisy object props changes
    useEffect(()=>{

        if(props.playlistObj == null) {
            return;
        }

        setHeader(props.playlistObj);

    },[props.playlistObj])

    const handleQueuePlaylist = () => {
      const playlistObj ={
        'playlistID' : header.playlistID,
        'playlistName' : header.playlistName,
        'playlistSrc' : header.playlistSrc
      }
      props.loadPlaylist(playlistObj, true); // playlist obj & queueStart
    }

    const handleDeletePlaylist = () => {
      setDialogState(true);
    }

    const handleDialogClose = () => {
      setDialogState(false);
    }

    // delete playlist
    const dialogRemovePress = () => {
      const status = removePlaylistByID(header.playlistID);
      if(status){
        alert('Playlist deleted successfully.');
        // refresh view
        // TODO: refresh view after deletion of playlist
        handleDialogClose();
      }else{
        console.error('something went wrong!!!');
      }
    }

    return (
        <Card className={classes.root}>
            {header.playlistSrc != null || header.playlistSrc != undefined ?
                <CardMedia
                    className={classes.cover}
                    image={header.playlistSrc}
                />
                : null
            }
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {header.playlistName}
                </Typography>
                {/* <Typography variant="subtitle1" color="textSecondary">
                    {header.playlistSrc}
                </Typography> */}
                </CardContent>
                <div className={classes.controls}>
                <IconButton aria-label="play/pause" onClick={handleQueuePlaylist} title="Play">
                    <PlayArrowIcon className={classes.Icon} />
                </IconButton>

                <ContainerView musicObj={props.musicObj} playlistObj={props.playlistObj} />

                <IconButton aria-label="delete playlist" onClick={handleDeletePlaylist} title="Delete Playlist">
                    <RemoveCircleOutlineIcon style={{color:'#ee0000'}} className={classes.Icon} />
                </IconButton>

                </div>
            </div>

            <AlertDialog
              openModal={dialogState}
              ModalClosed={handleDialogClose}

              headerText={"Delete Playlist ?"}
              content={"Are you sure you want to delete "+header.playlistName+" playlist. All the contents of playlist will be lost and can't be recovered."}

              positiveButtonText={"Delete"}
              negativeButtonText={"Cancel"}

              positiveAction={dialogRemovePress}
              negativeAction={handleDialogClose}

            />

        </Card>
    )
}

export default PlaylistHeaderView
