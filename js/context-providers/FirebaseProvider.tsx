import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, User } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { createContext, useRef, useEffect, useState } from "react";
import firebaseConfig from "../../firebase.config";

interface ProviderProps {
  children?: React.ReactNode;
}

export interface FirebaseContextType {
  auth: Auth;
  db: Firestore;
  user: JungoUser;
  storage: FirebaseStorage;
}

export interface UserDoc {
  activity_setting: string;
  birthday: Timestamp;
  created_at: Timestamp;
  first_name: string;
  last_name: string;
  username: string;
}

export interface JungoUser extends User {
  doc?: UserDoc;
  hasDoc?: boolean
  
}

export const FirebaseContext = createContext<FirebaseContextType>({
  auth: null,
  db: null,
  user: null,
  storage: null
});

const FirebaseWrapper: (props: ProviderProps) => JSX.Element = ({
  children,
}) => {
  const app = useRef<FirebaseApp>(initializeApp(firebaseConfig)).current;
  const db = useRef<Firestore>(getFirestore(app)).current;
  const auth = useRef<Auth>(getAuth(app)).current;
  const storage = useRef<FirebaseStorage>(getStorage(app)).current;
  const [user, setUser] = useState<JungoUser>(null)

  const setUserDoc = (doc: UserDoc) => {
    setUser({
      ...user,
      doc,
      hasDoc: true
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user?.uid) {
      getUserDoc(user.uid)
        .then((doc) => {
          setUserDoc(doc)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [user?.uid])

  const getUserDoc: (uid: string) => Promise<UserDoc> = async (uid: string) => {
    return new Promise((resolve, reject) => {
      const ref = doc(db, "users", uid);
      getDoc(ref)
        .then((val) => {
          if (val.exists()){
            resolve(val.data() as UserDoc)
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

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        db,
        user,
        storage
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseWrapper;
