import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
    // pass parameters which needs to pass to parent(CardGridView) component
    props.loadMedia(musicObj);
  }

  return (
    <Card className={classes.root} onClick={handleOnClick}>
      <CardActionArea>
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

      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}

    </Card>
  );
}

export default MusicCard;