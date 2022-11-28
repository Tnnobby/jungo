import { useContext } from "react";
import { FirebaseContext } from "../context-providers/FirebaseProvider";

export default function useFirebase () {
  const firebase = useContext(FirebaseContext)

  return firebase;
}