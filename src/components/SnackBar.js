import React,{useEffect,useState, useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import AlertContext from '../context/playlist/AlertContext';

export default function SnackBar() {
  const [open, setOpen] = useState(false);

  const {ctxAlert,setCtxAlert} = useContext(AlertContext);

  useEffect(()=>{
    if(ctxAlert.alert==null){
      return;
    }

    handleOpen();

  },[ctxAlert])


  const handleOpen = () => {
    setOpen(true);

    //after displaying alert again set alert context variable to null
    setCtxAlert({
      alert:null,
      message:ctxAlert.message
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={ctxAlert.message}
      />
    </div>
  );
}
