import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MergeTypeIcon from '@material-ui/icons/MergeType';

import SettingsModal from './SettingsModal';
import MenuModal from './MenuModal';

const useStyles = makeStyles((theme) => ({

  feelingLucky: {
    '@media only screen and (min-width: 960px)' :{
      /* styles for browsers larger than 960px; */
      display: 'block'
    },
    '@media only screen and (min-width: 1440px)' :{
        /* styles for browsers larger than 1440px; */
        display: 'block'
    },
    '@media only screen and (min-width: 2000px)' :{
        /* for sumo sized (mac) screens */
        display: 'block'
    },
    '@media only screen and (max-device-width: 480px)' :{
      /* styles for mobile browsers smaller than 480px; (iPhone) */
      display: 'none'
    },
    '@media only screen and (device-width: 768px)' :{
      /* default iPad screens */
      display: 'none'
    },
    /* different techniques for iPad screening */
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)' :{
      /* For portrait layouts only */
      display: 'none'
    },
    '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)' :{
      /* For landscape layouts only */
      display: 'none'
    }
  },

  root: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100vw",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",

    // For sticky header
    position: 'fixed',
    top: 0,
    backgroundColor: 'white',
    zIndex: 999
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchPanel(props) {
  const classes = useStyles();

  return (
    <div component="form" className={classes.root}>

      <MenuModal />

      <InputBase
        id='yt-query'
        className={classes.input}
        placeholder="Youtube Search"
        inputProps={{ 'aria-label': 'youtube search' }}
        // ref = {props.inputRef}
        onChange = {props.inputRef}
        onKeyPress = {props.keyPressRef}
      />
      
      <SettingsModal/>

      <IconButton className={classes.iconButton} aria-label="feeling-lucky" onClick={props.feelingLuckyRef} title="Feeling Lucky">
        <MergeTypeIcon /> <div className={classes.feelingLucky} style={{fontSize:'17px'}}>Feeling Lucky</div>
      </IconButton>

      <IconButton className={classes.iconButton} aria-label="playlist" onClick={props.playlistRef} title="Show Playlists">
        <PlaylistAddCheckIcon />
      </IconButton>

      <IconButton className={classes.iconButton} aria-label="search" onClick={props.submitRef} title="Search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}
