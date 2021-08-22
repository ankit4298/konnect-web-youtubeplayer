import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import IconButton from '@material-ui/core/IconButton';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  card: {
    // padding: theme.spacing(2),
    backgroundColor: '#a9dad9'
  },
  typography: {

  },
  iconButton: {
    fontSize: '25px'
  },
  content: {
    flex: '1 0 auto',
    display: 'inline-block !important',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  coverDiv: {
    display: 'inline-block !important'
  },
  cover: {
    width: '100px',
  },
}));

export default function NowPlayingModal(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [nowPlaying, setNowPlaying] = useState([]);


  useEffect(()=>{
    if(props.currentTrack != null) {
      setNowPlaying(props.currentTrack);
    }
    else{
        return;
    }
}, [props.currentTrack])

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const DisplayNowPlaying = () => {
    return(
        <Card className={classes.card}>

          {
            nowPlaying.imageSrc != null || nowPlaying.imageSrc != undefined  ? 
              <div className = {classes.coverDiv}>
                <img src={nowPlaying.imageSrc}
                  alt="now-playing"
                  className = {classes.cover}
                />
              </div>
            : null
          }

          <div className={classes.content}>
            <Typography className={classes.typography}>
                {nowPlaying.videoName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {nowPlaying.channelName}
              </Typography>
          </div>
          
        </Card>
    );
  }

  return (
    <div className={classes.root}>

      {
        nowPlaying.length != 0 ?
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            <DisplayNowPlaying />
          </Popper>
        : null
     }

      <IconButton aria-label="queue-playlist" onClick = {handleClick('top')} title="Now Playing">
        <QueueMusicIcon className={classes.iconButton}/>
      </IconButton>
      
      
    </div>
  );
}
