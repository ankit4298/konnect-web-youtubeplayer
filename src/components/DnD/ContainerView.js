import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ViewListIcon from "@material-ui/icons/ViewList";

import ReactDOM from "react-dom";
import DnDContainer from "./DnDContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PlaylistContext from '../../context/PlaylistContext';

const useStyles = makeStyles((theme) => ({
  Icon: {
    height: 38,
    width: 38,
  },
}));

export default function ContainerView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [musicObj, setMusicObj] = useState(null);
  const [playlistObj, setPlaylistObj] = useState(null);

  const [savePlaylist, setSavePlaylist] = useState(null);

  const {ctxRefreshPlaylist,setCtxRefreshPlaylist,ctxRefDelPlaylist,setCtxRefDelPlaylist} = useContext(PlaylistContext);

  useEffect(() => {
    if (props.musicObj == null && props.musicObj.length == 0) {
      return;
    }

    setMusicObj(props.musicObj);
  }, [props.musicObj]);

  useEffect(() => {
    if (props.playlistObj == null && props.playlistObj.length == 0) {
      return;
    }

    setPlaylistObj(props.playlistObj);
  }, [props.playlistObj]);

  const handleOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleDBPlaylistSave = () => {
    setSavePlaylist(playlistObj); // sends playlist obj to DnDContainer onSave
    handleClose();
  };

  // reset savePlaylist variable to null for not overriding save everytime reorder is press after already saving 1 time
  const handleSaveComplete = () => {
    const _playlistObj = playlistObj;
    
    setSavePlaylist(null);

    // set refresh playlist context to true and rerender playlist tracks in IndexPanel.js
    setCtxRefreshPlaylist(_playlistObj);
  }

  return (
    <div>
      <IconButton
        className={classes.iconButton}
        aria-label="Reorder List"
        onClick={handleOpen()}
        title="Reorder Playlist"
      >
        <ViewListIcon className={classes.Icon} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Reorder Playlist</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <DndProvider backend={HTML5Backend}>
              {/* sends playlist obj onSave*/}
              <DnDContainer musicObj={musicObj} onPlaylistSave={savePlaylist} SaveCompleted={handleSaveComplete} />
            </DndProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDBPlaylistSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
