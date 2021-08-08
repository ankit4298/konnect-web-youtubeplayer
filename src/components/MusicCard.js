import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Auth} from "../services/DBService";
import PlaylistModal from './PlaylistModal';

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

  const musicObj = {
    'videoID' : props.id,
    'videoName' : props.name,
    'channelName' : props.channelName,
    'imageSrc' : props.src
  }

  const handleOnClick = () =>{

    // sending playlisy props to CardView -> Index
    if(props.playlistCard==true){
      const playlistObj ={
        'playlistID' : props.id,
        'playlistName' : props.videoName
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

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          className={classes.media}
          image={musicObj.imageSrc}
          title={musicObj.videoID}
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

        {!props.disableAdd ? <PlaylistModal musicObjRef = {getMusicObj}/> : null}
        

        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>

    </Card>
  );
}

export default MusicCard;