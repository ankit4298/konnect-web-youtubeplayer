import React, { useState, useEffect } from "react";

import { FIREBASE_APP } from "../services/firebaseAppConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignInScreen from "./SignInScreen";
import MainScreen from "./MainScreen";

import SnackBar from "../components/SnackBar";

import PlaylistContext from "../context/PlaylistContext";
import AlertContext from "../context/AlertContext";

export default function InitScreen() {
  const [alreadySignedIn, setAlreadySignedIn] = useState(false);

  const [ctxRefreshPlaylist, setCtxRefreshPlaylist] = useState(null);
  const [ctxRefDelPlaylist, setCtxRefDelPlaylist] = useState(null);

  const [ctxAlert, setCtxAlert] = useState({
    alert: null,
    message: null,
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setAlreadySignedIn(true);
        console.log(uid);
        // ...
      } else {
        // User is signed out
        setAlreadySignedIn(false);
      }
    });
  }, []);

  return (
    <div>
      {alreadySignedIn ? (
        <PlaylistContext.Provider
          value={{
            ctxRefreshPlaylist,
            setCtxRefreshPlaylist,
            ctxRefDelPlaylist,
            setCtxRefDelPlaylist,
          }}
        >
          <AlertContext.Provider value={{ ctxAlert, setCtxAlert }}>
            <div>
              <MainScreen />
              <SnackBar />
            </div>
          </AlertContext.Provider>
        </PlaylistContext.Provider>
      ) : (
        <SignInScreen />
      )}
    </div>
  );
}
