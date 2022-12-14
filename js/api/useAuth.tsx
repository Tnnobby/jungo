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
  const { auth, db, actions } = useContext(FirebaseContext);

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
              resolve(true);
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
      const userDoc = {
        ...data,
        created_at: Timestamp.now(),
        birthday: Timestamp.fromDate(data.birthday),
      };
      // FIXME : Currently dispatching userdoc right after it is created, maybe not a good place to handle this, think of a better place to put this.
      setDoc(doc(db, "users", uid), userDoc)
        .then(() => {
          actions.dispatchUser({
            type: "FETCH_USER_DOC_SUCCESS",
            doc: userDoc,
          });
          resolve(userDoc);
        })
        .catch((reason) => reject(reason));
    });
  };

  return {
    newUser,
    loginUser,
    createUserDoc,
  };
}
