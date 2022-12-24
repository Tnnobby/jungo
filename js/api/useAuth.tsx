import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useContext } from "react";
import {
  FirebaseContext,
  UserDoc,
} from "../context-providers/FirebaseProvider";

type LoginMethods = "email";

export default function useAuth() {
  const { auth, db, actions } = useContext(FirebaseContext);

  /**
   * @param {{method:'email' | null, email?: string, password?: string}} param0 email and password required for email method
   */
  const newUser = async ({ method, email, password }) => {
    switch (method) {
      case "email":
        actions.dispatchUser({ type: "SET_NEW_USER" });
        return createUserWithEmailAndPassword(auth, email, password);
      default:
        return Promise.reject("Invalid Method");
    }
  };

  const loginUser = async ({
    method,
    email,
    password,
  }: {
    method: LoginMethods;
    email?: string;
    password?: string;
  }) => {
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
      const userDoc: UserDoc = {
        ...data,
        created_at: Timestamp.now(),
        private: {
          birthday: Timestamp.fromDate(data.birthday),
        },
      };
      setDoc(doc(db, "users", uid), userDoc)
        .then(() => {
          actions.dispatchUser({
            type: "SET_NEW_USER_DOC",
            doc: userDoc,
          });
          resolve(userDoc);
        })
        .catch((reason) => reject(reason));
    });
  };

  const getUserInfo = async (uid: string) => {
    const ref = doc(db, "users", uid);
    return getDoc(ref).then((val) => val.data());
  };

  return {
    newUser,
    loginUser,
    createUserDoc,
    getUserInfo,
  };
}
