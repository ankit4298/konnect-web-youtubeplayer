import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100vw",
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
    <Paper component="form" className={classes.root}>
      {/* <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton> */}

      <IconButton className={classes.iconButton} aria-label="menu">
        <YouTubeIcon htmlColor="red" />
      </IconButton>

      <InputBase
        className={classes.input}
        placeholder="Youtube Search"
        inputProps={{ 'aria-label': 'youtube search' }}
        // ref = {props.inputRef}
        onChange = {props.inputRef}
        onSubmit = {props.keyPressRef}
        onKeyPress = {props.keyPressRef}
      />
      
      <IconButton className={classes.iconButton} aria-label="search" onClick={props.submitRef}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
