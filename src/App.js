import React,{useState} from 'react';
import './App.css';
import MainScreen from './screens/MainScreen';
import PlaylistContext from './context/playlist/PlaylistContext'
import AlertContext from './context/playlist/AlertContext'

import SnackBar from './components/SnackBar'


if (process.env.REACT_APP_APP_MODE == 'production') {
  console.log = console.warn = console.error = () => {};
}

function App() {

  const [ctxRefreshPlaylist,setCtxRefreshPlaylist] = useState(null);
  const [ctxRefDelPlaylist,setCtxRefDelPlaylist] = useState(null);


  const [ctxAlert,setCtxAlert] = useState({
    alert:null,
    message:null
  });

  return (
    <PlaylistContext.Provider value = {{ctxRefreshPlaylist,setCtxRefreshPlaylist,ctxRefDelPlaylist,setCtxRefDelPlaylist}}>
      <AlertContext.Provider value = {{ctxAlert,setCtxAlert}}>
        <div>
          <MainScreen/>
          <SnackBar />
        </div>
      </AlertContext.Provider>
    </PlaylistContext.Provider>
  );
}

export default App;
