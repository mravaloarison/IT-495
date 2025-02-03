import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqOD6L7bshB9-PRQ3UGccvZa_hQKwO0nI",
  authDomain: "doordashfashion.firebaseapp.com",
  projectId: "doordashfashion",
  storageBucket: "doordashfashion.firebasestorage.app",
  messagingSenderId: "61918887629",
  appId: "1:61918887629:web:9993e261eb65eddc6ab384"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function ContinueWithGoogle() {
    signInWithPopup(auth, provider) 
  .then(() => {
    location.href = "/";
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
}

// DB
const db = getFirestore(app);

export async function addUser(data: any) {
  const userRef = doc(db, "users", data.email);
  await setDoc(userRef, data);
}

export async function isUser(email: string) {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}
