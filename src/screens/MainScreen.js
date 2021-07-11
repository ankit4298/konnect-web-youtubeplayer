import React, { useState } from 'react'
import IndexPanel from './IndexPanel'
import MusicScreen from './MusicScreen'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flex: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function MainScreen() {

    const topPane = {
        height: "80vh"
    }

    const footer = {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        backgrondColor: "red",
        color: "white",
    }

    const classes = useStyles();

    const [musicObj, setMusicObj] = useState(null);

    const onMediaSelectionChanged = (musicObj) => {
      // setting new music Props and passing to MusicScreen
      setMusicObj(musicObj);
    }


    return (
        <div>
            <div style={topPane}><IndexPanel mediaChangeRequest = {onMediaSelectionChanged} /></div>
            <div style={footer}><MusicScreen musicObj = {musicObj}/></div>
        </div>
    )
}

export default MainScreen
