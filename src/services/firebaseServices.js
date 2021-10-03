import { FIREBASE_APP } from "../services/firebaseAppConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

var returnModal = {
  user: null,
  error: null,
};

async function signInUser(uname, password) {
  await signInWithEmailAndPassword(auth, uname, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      returnModal.user = user;
      returnModal.error = null;
    })
    .catch((error) => {
      returnModal.user = null;
      returnModal.error = error;
      console.log(returnModal)
    });
    
    return returnModal;
}

async function signOutUser() {
  await signOut(auth)
    .then(() => {
        returnModal.user = 'User Signed out';
        returnModal.error = null;
    })
    .catch((error) => {
        returnModal.user = null;
        returnModal.error = error;
    });
    
    return returnModal;
}

export { signInUser, signOutUser };
