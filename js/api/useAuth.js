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
import { useRef } from "react";
import firebaseConfig from "../../firebase.config";

export default function useAuth() {
  const app = useRef(initializeApp(firebaseConfig)).current;
  const db = useRef(getFirestore(app)).current;
  const auth = useRef(getAuth(app)).current;

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
   *
   * @param {{method:'email' | null, email?: string, password?: string}} param0
   * @returns
   */
  const loginUser = async ({ method, email, password }) => {
    return new Promise((resolve, reject) => {
      switch (method) {
        case "email":
          signInWithEmailAndPassword(auth, email, password)
            .then((val) => {
              const userInfo = val.user;
              getUserDoc(userInfo.uid)
                .then((val) => {
                  console.log(val)
                  resolve({
                    ...val,
                    ...userInfo.toJSON(),
                  });
                })
                .catch((reason) => {
                  reject(reason);
                });
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

  const convertTimestamp = (firebaseTimestamp) => { 
    const d = new Date(serverTimestamp.seconds)
    return d.toString()
  }

  const getUserDoc = async (uid) => {
    return new Promise((resolve, reject) => {
      const ref = doc(db, "users", uid);
      getDoc(ref)
        .then((val) => {
          if (val.exists()){
            let _data = val.data()
            _data.birthday = convertTimestamp(_data.birthday)
            _data.created_at = convertTimestamp(_data.created_at)
            resolve(_data);
          } else {
            reject("UserDoc does not Exist.")
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
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
