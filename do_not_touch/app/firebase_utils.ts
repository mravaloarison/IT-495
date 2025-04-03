import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDqOD6L7bshB9-PRQ3UGccvZa_hQKwO0nI",
    authDomain: "doordashfashion.firebaseapp.com",
    projectId: "doordashfashion",
    storageBucket: "doordashfashion.firebasestorage.app",
    messagingSenderId: "61918887629",
    appId: "1:61918887629:web:9993e261eb65eddc6ab384"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export async function addUserToDB(data: any) {
    const docRef = doc(db, "users", data.email);
    await setDoc(docRef, data);
}

export async function isUserAlreadyInDB(email: string) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

export async function getUserFromDB(email: string) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    // console.log("User data:", docSnap.data());
    return docSnap.data();
}