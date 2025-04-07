import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqOD6L7bshB9-PRQ3UGccvZa_hQKwO0nI",
  authDomain: "doordashfashion.firebaseapp.com",
  projectId: "doordashfashion",
  storageBucket: "doordashfashion.firebasestorage.app",
  messagingSenderId: "61918887629",
  appId: "1:61918887629:web:9993e261eb65eddc6ab384"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

// BASICS
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


// ADD TO BIG THREE
export async function addUserToDriverDB(data: any) {
  const docRef = doc(db, "drivers", data.email);
  
  const newData = {
    fullName: data.fullname,
    phoneNumber: data.phone_number,
    driverLicenseNumber: data.driver_license_number,
    location: "",
    logoURL: "/",
  }

  await setDoc(docRef, newData);
}

export async function addUserToCustomerDB(data: any) {
  console.log("Adding user to customer DB:", data);
  const docRef = doc(db, "customers", data.email);
  
  const newData = {
    fullName: data.fullname,
    phoneNumber: data.phone_number,
    location: "",
    logoURL: "/",
  }

  await setDoc(docRef, newData);
}

export async function addUserToCompanyDB(data: any) {
  const docRef = doc(db, "companies", data.email);
  
  const newData = {
    companyName: data.company_name,
    phoneNumber: data.phone_number,
    location: "",
    logoURL: "/",
  }

  await setDoc(docRef, newData);
}

// UPDATE BIG THREE
type Collection = "customers" | "companies" | "drivers";

export async function updateNameAndLogo(
  collection: Collection,
  email: string,
  data: { fullName?: string; companyName?: string; logoURL: string }
) {
  const docRef = doc(db, collection, email);

  const updateData: any = {
    "logoURL": data.logoURL,
  };

  if (collection === "companies") {
    updateData["companyName"] = data.companyName;
  } else {
    updateData["fullName"] = data.fullName;
  }

  await updateDoc(docRef, updateData);
}

export async function updateLocation(
  collection: Collection,
  email: string,
  location: string
) {
  const docRef = doc(db, collection, email);

  await updateDoc(docRef, {
    "location": location,
  });
}

// GETTERS
export async function getDriverFromDB(email: string) {
  const docRef = doc(db, "drivers", email);
  const docSnap = await getDoc(docRef);
  
  return docSnap.data();
}

export async function getCustomerFromDB(email: string) {
  const docRef = doc(db, "customers", email);
  const docSnap = await getDoc(docRef);
  
  return docSnap.data();
}

export async function getCompanyFromDB(email: string) {
  const docRef = doc(db, "companies", email);
  const docSnap = await getDoc(docRef);
  
  return docSnap.data();
}

// INVENTORY
export async function addToCompanyInventoryItem({
  email,
  category,
  itemName,
  price,
  picURL,
}: {
  email: string,
  category: string,
  itemName: string,
  price: number,
  picURL: string,
}) {
  const itemRef = doc(db, "companies", email, "inventory", category);

  await setDoc(itemRef, {
    [itemName]: {
      price: price,
      picURL: picURL,
    },
  }, { merge: true });
}