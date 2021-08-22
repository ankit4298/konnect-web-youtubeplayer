import React, {useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CardActions from '@material-ui/core/CardActions';

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles((theme) => ({
    mainDIV:{
      padding: '5px',
    },
    root: {
      display: 'flex',
      height: '100px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
    },
    textDetails: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      minWidth: '150px',
    },
    controls: {
      alignItems: 'center',
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

function QueueList(props) {
    const classes = useStyles();

    const musicObj = {
      'videoID' : props.id,
      'videoName' : props.name,
      'channelName' : props.channelName,
      'imageSrc' : props.src
    }

    const handleCardEvent = () =>{
      console.log(musicObj);
    }

    return (
        <div className={classes.mainDIV}>

            <Card
              className={classes.root}
              style={{backgroundColor: props.nowPlaying.videoID == musicObj.videoID ? "#8cdea6" : "#c7c9d3"}}
            >
              <CardMedia
                className={classes.cover}
                image={musicObj.imageSrc}
              />
              <div className={classes.details}>

                  <CardContent className={classes.textDetails}>
                    <Typography component="h6" variant="h6" title={musicObj.videoName}>
                        {musicObj.videoName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" title={musicObj.channelName}>
                        {musicObj.channelName}
                    </Typography>

                  </CardContent>

                  <CardActions>
                    <div className={classes.controls}>
                        {/* TODO: add supports for controls in queue list */}

                        {/* <IconButton size="small" aria-label="play/pause" title="Play" onClick={handleCardEvent}>
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton> */}

                        {/* <IconButton size="small" aria-label="play/pause" title="Delete Playlist">
                            <RemoveCircleOutlineIcon className={classes.playIcon} />
                        </IconButton> */}
                    </div>  
                  </CardActions>
              </div>
            </Card>
        </div>
    )
}

export default QueueList
