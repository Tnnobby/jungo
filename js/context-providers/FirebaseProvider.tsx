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
import { useAlert } from "../hooks/useAlert";

interface ProviderProps {
  children?: React.ReactNode;
}

type FirebaseActions = {
  logout: () => void;
  dispatchUser: React.Dispatch<UserAction>;
  addListener: AddListenerFunction<ListenerTypes>;
  removeListener: (id: number) => boolean;
  fetchUserDoc: () => Promise<boolean>;
};

export interface FirebaseContextType {
  auth: Auth;
  db: Firestore;
  user: JungoUser;
  storage: FirebaseStorage;
  actions: FirebaseActions;
}

export interface UserDoc {
  activity_setting: string;
  created_at: Timestamp;
  first_name: string;
  last_name: string;
  username: string;
  private: {
    birthday: Timestamp;
  }
}

export interface JungoUser extends Partial<User> {
  doc?: UserDoc;
  hasDoc?: boolean;
  fetchingDoc?: boolean;
  newUser?: boolean;
}

type UserAction = {
  type:
    | "FETCH_USER_DOC_START"
    | "FETCH_USER_DOC_SUCCESS"
    | "FETCH_USER_DOC_ERROR"
    | "SET_USER"
    | "LOG_OUT_USER"
    | "SET_NEW_USER"
    | "SET_NEW_USER_DOC";
  doc?: UserDoc;
  user?: User;
};

type UserReducer = (state: JungoUser, action: UserAction) => JungoUser;

export const FirebaseContext = createContext<FirebaseContextType>({
  auth: null,
  db: null,
  user: null,
  storage: null,
  actions: {
    logout: () => null,
    dispatchUser: null,
    addListener: () => null,
    removeListener: () => null,
    fetchUserDoc: () => null,
  },
});

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
    case "SET_USER":
      return {
        ...action.user,
        doc: null,
        hasDoc: false,
        fetchingDoc: false,
      };
    case "SET_NEW_USER":
      return {
        ...state,
        newUser: true,
      };
    case "SET_NEW_USER_DOC":
      return {
        ...state,
        newUser: false,
        doc: action.doc,
        fetchingDoc: false,
        hasDoc: true,
      };
    case "LOG_OUT_USER":
      return initialState;
    default:
      return state;
  }
};

type ListenerMap = {
  DONE_FETCHING: (result: boolean) => void;
};
type ListenerTypes = keyof ListenerMap;
type Listener<L extends ListenerTypes> = { type: L; cb: ListenerMap[L] };
type ListenerList = Listener<ListenerTypes>[];
type ListenerReturnType = {
  remove: () => void;
};
type AddListenerFunction<T extends ListenerTypes> = (
  type: T,
  cb: ListenerMap[T]
) => ListenerReturnType;

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
  const listeners = useRef<ListenerList>([]);
  const { alert } = useAlert();

  // TODO : Move this to Login function, right now it is triggering unnecessarily on signup, should only need to be triggered on login.
  useEffect(() => {
    if (user?.uid && !user?.newUser) {
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

  const fetchUserDoc = async () => {
    dispatchUser({ type: "FETCH_USER_DOC_START" });
    return new Promise<boolean>((resolve, reject) => {
      console.log(user.uid);
      getUserDoc(user.uid)
        .then((doc) => {
          console.log("userDoc Fetched");
          dispatchUser({ type: "FETCH_USER_DOC_SUCCESS", doc });
          resolve(true);
        })
        .catch((error) => {
          console.log("userDoc Fetch failed");
          dispatchUser({ type: "FETCH_USER_DOC_ERROR" });
          resolve(false);
        });
    });
  };

  useEffect(() => {
    if (!user.fetchingDoc) {
      listeners.current.forEach((val) => {
        if (val.type === "DONE_FETCHING") val.cb(user.hasDoc);
      });
    }
  }, [user?.fetchingDoc]);

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
      dispatchUser({ type: "LOG_OUT_USER" });
      // alert({ message: "Successfully Logged Out!" });
    });
  };

  const addListener = <T extends ListenerTypes>(
    type: T,
    cb: ListenerMap[T]
  ): { remove: () => void } => {
    const id = listeners.current.length + 1;
    listeners.current = [...listeners.current, { type, cb }];
    return {
      remove: () =>
        (listeners.current = listeners.current.filter(
          (_, index) => index !== id
        )),
    };
  };
  const removeListener = (id: number) => {
    return true;
  };

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        db,
        user,
        storage,
        actions: {
          logout,
          dispatchUser,
          addListener,
          removeListener,
          fetchUserDoc,
        },
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseWrapper;
