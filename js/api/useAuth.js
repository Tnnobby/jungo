import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useContext } from "react";
import firebaseConfig from "../../firebase.config";
import { FirebaseContext } from "../context-providers/FirebaseProvider";

export default function useAuth() {
  const { auth, db } = useContext(FirebaseContext)

  /**
   * @param {{method:'email' | null, email?: string, password?: string}} param0 email and password required for email method
   */
  const newUser = async ({ method, email, password }) => {
    switch (method) {
      case "email":
        return createUserWithEmailAndPassword(auth, email, password);
      default:
        return Promise.reject("Invalid Method");
    }
  };

  /**
   * @param {{method:'email' | null, email?: string, password?: string}} param0
   * @returns
   */
  const loginUser = async ({ method, email, password }) => {
    return new Promise((resolve, reject) => {
      switch (method) {
        case "email":
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              resolve(true)
            })
            .catch((reason) => {
              reject(reason);
            });
          break;
        default:
          reject(`Invalid Login Method: ${method}`);
      }
    });
  };

  const createUserDoc = async ({ uid, data }) => {
    return new Promise((resolve, reject) => {
      setDoc(doc(db, "users", uid), {
        ...data,
        created_at: Timestamp.now(),
        birthday: Timestamp.fromDate(data.birthday)
      })
        .then((res) => resolve({
        ...data,
        created_at: Timestamp.now().seconds,
        birthday: Timestamp.fromDate(data.birthday).seconds
      }))
        .catch((reason) => reject(reason));
    });
  };

  return {
    newUser,
    loginUser,
    createUserDoc,
  };
}
