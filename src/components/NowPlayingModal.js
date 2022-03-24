import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import IconButton from '@material-ui/core/IconButton';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Card from '@material-ui/core/Card';
import YouTube from 'react-youtube';

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
  
  var YTEmbedPlayer = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [seekTime, setSeekTime] = useState(0);

  useEffect(()=>{
    if(props.currentTrack != null) {
      setNowPlaying(props.currentTrack);
    }
    else{
        return;
    }
  }, [props.currentTrack])
  useEffect(()=>{
    if(props.a2v != null) {
      console.log(props.a2v);
    }
    else{
        return;
    }
  }, [props.a2v])

  const handleClick = (newPlacement) => (event) => {

    // set video show to false when now playing is closed
    if(open){

      // get current playing time of YTEmbedPlayer
      console.log(YTEmbedPlayer);

      setShowVideo(false);
    }

    console.log('open status', open)
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

          <div>
            <input type ="button" value ="switch 2 video (ALPHA)" onClick={switchToVideo}/>
          </div>
          
        </Card>
    );
  }

  const switchToVideo = () => {
    setShowVideo(true);
    const time = props.getTracksCurrentTime();
    props.pausePlayer();
    setSeekTime(time);
  }

  const ABC = () => {
    return (
      <div id="player">

      <iframe
        width="410"
        height="288"
        src={`https://www.youtube.com/embed/${nowPlaying.videoID}?autoplay=1&cc_load_policy=1&start=${seekTime}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="1"
        ></iframe>
      </div>
    )
  }

  const YTEmbed = () => {
    const opts = {
      height: '288',
      width: '410',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        // controls: 0,
        disablekb: 1,
        start: seekTime
      },
    };

    return <YouTube videoId={nowPlaying.videoID} opts={opts} onPause={func} ref={YTEmbedPlayer}/>;
  }

  const func = (data) => {
    console.log(data.target.playerInfo.currentTime)
  }

  return (
    <div className={classes.root}>

      {
        nowPlaying.length != 0 ?
          <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {
              showVideo != null && showVideo ?
                // <ABC/>
                <YTEmbed/>
              : 
                <DisplayNowPlaying />
            }
            
          </Popper>
        : null
     }

      <IconButton aria-label="queue-playlist" onClick = {handleClick('top')} title="Now Playing">
        <QueueMusicIcon className={classes.iconButton}/>
      </IconButton>

    </div>
  );
}
