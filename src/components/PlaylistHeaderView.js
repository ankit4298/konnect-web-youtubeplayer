import React, {useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

function PlaylistHeaderView(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [header, setHeader] = useState([]);

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
                <IconButton aria-label="play/pause" onClick={handleQueuePlaylist}>
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                </div>
            </div>
        </Card>
    )
}

export default PlaylistHeaderView
