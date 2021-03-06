import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import PlaylistModal from './PlaylistModal';

import PlaylistContext from '../context/PlaylistContext';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    minHeight: 300
  },
  media: {
    height: 140,
  },
});

function MusicCard(props) {
  const classes = useStyles();
  
  const plistContext = useContext(PlaylistContext);

  const musicObj = {
    'videoID' : props.id,
    'videoName' : props.name,
    'channelName' : props.channelName,
    'imageSrc' : props.src
  }

  const handleOnClick = () =>{

    // sending playlist props to CardView -> Index
    if(props.playlistCard==true){
      const playlistObj ={
        'playlistID' : props.id,
        'playlistName' : props.name,
        'playlistSrc' : props.src
      }
      props.loadPlaylist(playlistObj);
      return;
    }

    // normal passing paramters, invoke loadMedia prop's value function in CardGridView
    // pass parameters which needs to pass to parent(CardGridView) component
    props.loadMedia(musicObj);
  }

  const getMusicObj = () =>{
    return musicObj;
  }

  const handleQueuePlaylist = () => {
    const playlistObj ={
      'playlistID' : props.id,
      'playlistName' : props.name,
      'playlistSrc' : props.src
    }
    props.loadPlaylist(playlistObj, true); // playlist obj & queueStart
  }

  const handleRemoveFromPlaylist = () => {
    const musicPlaylistObj = {
      'track': {
        'videoID' : props.id,
        'videoName' : props.name,
        'channelName' : props.channelName,
        'imageSrc' : props.src,
      },
      'playlist': {
        'playlistID' : props.playlistObj.playlistID,
        'playlistName' : props.playlistObj.playlistName,
        'playlistSrc' : props.playlistObj.playlistSrc
      }
    }
    props.removeTrackFromPlaylist(musicPlaylistObj);
  }

  const handleAddToQueue = () => {
    var _track = getMusicObj();

    // setting queue tarck in playlist context - queue
    plistContext.setCtxQueue(_track);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          className={classes.media}
          image={musicObj.imageSrc}
          // title={musicObj.videoID}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {musicObj.videoName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {musicObj.channelName}
          </Typography>
        </CardContent>
        
      </CardActionArea>

      <CardActions>
        {/* <Button size="small" color="primary" onClick = {handleAddToPlaylist}>
          Add to Playlist
        </Button> */}

        {/* Add to playlist */}
        {!props.playlistMode ? <PlaylistModal musicObjRef = {getMusicObj}/> : null}

        {/* Add to playlist */}
        {!props.playlistMode ? 
          <IconButton className={classes.iconButton} aria-label="queue-track" onClick={handleAddToQueue} title="Add to Queue">
            <QueueMusicIcon/>
          </IconButton>
        : null}

        {/* Quick play all playlist tracks */}
        {
          props.playlistMode ? 
            <IconButton className={classes.iconButton} aria-label="queue-playlist" onClick={handleQueuePlaylist} title="Quick Play">
              <PlayCircleOutlineIcon/>
            </IconButton>
          : 
          null
        }

        {/* Delete from playlist track */}
        {
          props.playlistTrack ?
            <IconButton className={classes.iconButton} aria-label="queue-playlist" onClick={handleRemoveFromPlaylist} title="Delete from Playlist">
              <DeleteForeverIcon/>
            </IconButton>
          :
          null
        }




        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>

    </Card>
  );
}

export default MusicCard;