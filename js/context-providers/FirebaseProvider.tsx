import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signOut, User } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { createContext, useRef, useEffect, useState, useReducer } from "react";
import firebaseConfig from "../../firebase.config";

interface ProviderProps {
  children?: React.ReactNode;
}

export interface FirebaseContextType {
  auth: Auth;
  db: Firestore;
  user: JungoUser;
  storage: FirebaseStorage;
  actions: FirebaseActions;
}

export interface UserDoc {
  activity_setting: string;
  birthday: Timestamp;
  created_at: Timestamp;
  first_name: string;
  last_name: string;
  username: string;
}

export interface JungoUser extends Partial<User> {
  doc?: UserDoc;
  hasDoc?: boolean;
  fetchingDoc?: boolean;
}

type FirebaseActions = {
  logout: () => void;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  auth: null,
  db: null,
  user: null,
  storage: null,
  actions: { logout: () => null },
});

type UserAction = {
  type:
    | "FETCH_USER_DOC_START"
    | "FETCH_USER_DOC_SUCCESS"
    | "FETCH_USER_DOC_ERROR"
    | "SET_USER";
  doc?: UserDoc;
  user?: User;
};

type UserReducer = (state: JungoUser, action: UserAction) => JungoUser;

const userReducer: UserReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_DOC_START":
      return {
        ...state,
        fetchingDoc: true,
      };
    case "FETCH_USER_DOC_SUCCESS":
      return {
        ...state,
        doc: action.doc,
        fetchingDoc: false,
        hasDoc: true,
      };
    case "FETCH_USER_DOC_ERROR":
      return {
        ...state,
        fetchingDoc: false,
      };
    case "SET_USER": {
      return {
        ...state,
        ...action.user,
        doc: null,
        hasDoc: false,
      };
    }
    default:
      return state;
  }
};

const initialState: JungoUser = {};

const FirebaseWrapper: (props: ProviderProps) => JSX.Element = ({
  children,
}) => {
  const app = useRef<FirebaseApp>(initializeApp(firebaseConfig)).current;
  const db = useRef<Firestore>(getFirestore(app)).current;
  const auth = useRef<Auth>(getAuth(app)).current;
  const storage = useRef<FirebaseStorage>(getStorage(app)).current;
  const [user, dispatchUser] = useReducer<UserReducer>(
    userReducer,
    initialState
  );

  useEffect(() => {
    if (user?.uid) {
      dispatchUser({ type: "FETCH_USER_DOC_START" });
      getUserDoc(user.uid)
        .then((doc) => {
          dispatchUser({ type: "FETCH_USER_DOC_SUCCESS", doc });
        })
        .catch((error) => {
          dispatchUser({ type: "FETCH_USER_DOC_ERROR" });
          console.error(error);
        });
    }
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      dispatchUser({ type: "SET_USER", user: _user });
    });
    return () => unsubscribe();
  }, []);

  const getUserDoc: (uid: string) => Promise<UserDoc> = async (uid: string) => {
    return new Promise((resolve, reject) => {
      const ref = doc(db, "users", uid);
      getDoc(ref)
        .then((val) => {
          if (val.exists()) {
            resolve(val.data() as UserDoc);
          } else {
            reject("UserDoc does not Exist.");
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  const logout = () => {
    signOut(auth).then((val) => {
      
    })
  };

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        db,
        user,
        storage,
        actions: {
          logout
        }
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseWrapper;
