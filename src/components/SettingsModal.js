import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import SaveIcon from "@material-ui/icons/Save";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";

import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: "20%",
    minWidth: "30%",
  },
  header: {
    color: '#0e62be'
  }
}));

export default function SettingsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { ctxAlert, setCtxAlert } = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if(userContext != null && userContext.ctxFirebaseUser != null){
      setUserInfo(userContext.ctxFirebaseUser)
    }
  }, [userContext]);

  useEffect(() => {
    if (props == null) {
      return;
    }

    if (props.openModal == true) {
      handleOpen();
    }
  }, [props.openModal]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.ModalClosed();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.header}>Konnect Account</h2>
            <p id="transition-modal-description">
              <p>
                <b>Name:</b> {userInfo !=null ? userInfo.displayName : null}
              </p>
              <p>
                <b>Email:</b> {userInfo !=null ? userInfo.email : null}
              </p>
            </p>

            <p>** Playlist will be saved/fetched based on the account</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
