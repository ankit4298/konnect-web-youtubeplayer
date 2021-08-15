import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import SettingsModal from './SettingsModal';
import MenuModal from './MenuModal';

const useStyles = makeStyles((theme) => ({
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

      <IconButton className={classes.iconButton} aria-label="search" onClick={props.playlistRef}>
        <PlaylistAddCheckIcon />
      </IconButton>

      <IconButton className={classes.iconButton} aria-label="search" onClick={props.submitRef}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}
