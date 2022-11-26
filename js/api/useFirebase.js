import {
  addDoc,
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v1 } from "uuid";
import { useState, useContext } from "react";
import { FirebaseContext } from "../context-providers/FirebaseProvider";

export default function useFirebase() {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { storage, db } = useContext(FirebaseContext);

  const addRecipe = async (data) => {
    const id = v1();
    let _data = data;
    _data.created_at = Timestamp.now();
    _data.id = id;
    _data.searchable_title = _data.details.title.toLowerCase();
    if (_data.details.photo.length > 0) {
      _data.details.photo = (
        await addPhoto(_data.details.photo[0], id)
      ).ref.fullPath;
    }
    return addDoc(collection(db, "recipes"), _data);
  };

  const addPhoto = async (data, id) => {
    const photo = await (
      await fetch(data.uri.replace("file://", "file:"))
    ).blob();
    return uploadBytes(ref(storage, `recipe_photos/${id}.jpg`), photo);
  };

  const getRecipes = async (count = 10) => {
    console.log("requesting recipes");
    const start =
      recipes.length > 0 ? recipes[recipes.length - 1].created_at : null;
    const q = start
      ? query(
          collection(db, "recipes"),
          orderBy("created_at"),
          limit(count),
          startAfter(start)
        )
      : query(collection(db, "recipes"), orderBy("created_at"), limit(count));
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((response) => {
          const responseData = response.docs.map((d) => d.data());
          setRecipes((r) => [...r, ...responseData]);
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const searchRecipes = (searchTerm) => {
    const q = query(
      collection(db, "recipes"),
      orderBy("searchable_title"),
      startAt(searchTerm),
      endAt(searchTerm + "~")
    );
    return new Promise((resolve, reject) => {
      getDocs(q)
        .then((response) => {
          if (response.empty) {
            setRecipes([]);
            resolve(false);
            return;
          }
          const responseData = response.docs.map((d) => d.data());
          setSearchResults(responseData);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const clearRecipes = () => setRecipes([]);

  return {
    addRecipe,
    getRecipes,
    searchRecipes,
    clearRecipes,
    searchResults,
    recipes,
  };
}
