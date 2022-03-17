import bcrypt from "bcryptjs";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const usersRef = collection(db, "users");

export const findEmail = async (_email) => {
  let res;
  const q = query(usersRef, where("email", "==", _email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().email === _email) {
      res = true;
    }
  });
  return res;
};

export const createUser = async (data, pass) => {
  bcrypt.hash(pass, 10, async (_, hash) => {
    let modData = data;
    modData = { ...modData, passwordHash: hash };
    setDoc(doc(usersRef), modData);
  });
};

export const getUserDetails = async (_email) => {
  let res;
  const q = query(usersRef, where("email", "==", _email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    res = data;
  });
  return res;
};
