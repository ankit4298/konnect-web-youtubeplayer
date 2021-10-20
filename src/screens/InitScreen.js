import React, { useState, useEffect } from "react";
import LoaderSVG from '../assets/loader.svg';

import { FIREBASE_APP } from "../services/firebaseAppConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

import SignInScreen from "./SignInScreen";
import MainScreen from "./MainScreen";

import SnackBar from "../components/SnackBar";

import PlaylistContext from "../context/PlaylistContext";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";

export default function InitScreen() {
  const [alreadySignedIn, setAlreadySignedIn] = useState(null);

  const [ctxRefreshPlaylist, setCtxRefreshPlaylist] = useState(null);
  const [ctxRefDelPlaylist, setCtxRefDelPlaylist] = useState(null);

  const [ctxQueue, setCtxQueue] = useState(null);

  const [ctxAlert, setCtxAlert] = useState({
    alert: null,
    message: null,
  });

  const [ctxFirebaseUser, setCtxFirebaseUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        setAlreadySignedIn(true);
        setCtxFirebaseUser(user);
        Cookies.set("KXUNAME", user.uid);
      } else {
        // User is signed out
        setAlreadySignedIn(false);
        Cookies.set("KXUNAME", "empty");
        Cookies.set("KXUCHANGE", "1"); // setting user has changed
      }
    });

    return () => {
      setAlreadySignedIn(false);
    };
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ ctxFirebaseUser, setCtxFirebaseUser }}>
        {alreadySignedIn == true ? (
          <PlaylistContext.Provider
            value={{
              ctxRefreshPlaylist, setCtxRefreshPlaylist,
              ctxRefDelPlaylist, setCtxRefDelPlaylist,
              ctxQueue, setCtxQueue
            }}
          >
            <AlertContext.Provider value={{ ctxAlert, setCtxAlert }}>
              <div>
                <MainScreen />
                <SnackBar />
              </div>
            </AlertContext.Provider>
          </PlaylistContext.Provider>
        ) : alreadySignedIn != null && alreadySignedIn == false ? (
          <SignInScreen />
        ) : (
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <img src={LoaderSVG} alt="Loader"/>
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}
