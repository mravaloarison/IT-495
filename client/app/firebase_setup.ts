import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqOD6L7bshB9-PRQ3UGccvZa_hQKwO0nI",
  authDomain: "doordashfashion.firebaseapp.com",
  projectId: "doordashfashion",
  storageBucket: "doordashfashion.firebasestorage.app",
  messagingSenderId: "61918887629",
  appId: "1:61918887629:web:9993e261eb65eddc6ab384"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function ContinueWithGoogle() {
    signInWithPopup(auth, provider) 
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log("Signed in with Google");
    console.log(token);
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("Error signing in with Google");
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    console.log(credential);
  });
}
