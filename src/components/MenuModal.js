import React, {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import CreatePlaylistModal from './CreatePlaylistModal'
import SettingsModal from './SettingsModal'

import {signOutUser} from '../services/firebaseServices'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function MenuModal(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }


  const handleCreatePlaylistModal = (e) => {
    setOpenCreatePlaylistModal(true);
    handleClose(e);
  }

  const handleCreatePlaylistModalClose = () => {
    setOpenCreatePlaylistModal(false);
  }

  const handleSettingsModal = (e) => {
    setOpenSettingsModal(true);
    handleClose(e);
  }

  const handleSettingsModalClose = () => {
    setOpenSettingsModal(false);
  }

  const handleSignOut = () => {
    signOutUser();
  }

  return (
    <div component="form" className={classes.root}>

      <IconButton className={classes.iconButton}
                  aria-label="menu"
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}>
        <YouTubeIcon htmlColor="red" />
      </IconButton>


      {/* --- Menu --- */}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleCreatePlaylistModal}>Create Playlist</MenuItem>
                    <MenuItem onClick={handleSettingsModal}>My Account</MenuItem>
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                    <MenuItem style={{cursor:'default', color:'#0e62be'}}>v{process.env.REACT_APP_VERSION}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      {/* --- Menu --- */}

    
    <CreatePlaylistModal openModal={openCreatePlaylistModal} ModalClosed ={handleCreatePlaylistModalClose}/>
    <SettingsModal openModal={openSettingsModal} ModalClosed ={handleSettingsModalClose}/>


    </div>
  );
}
