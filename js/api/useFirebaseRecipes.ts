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
import { useState } from "react";
import { Recipe, RecipeDetails } from "./firebase";
import useFirebase from "./useFirebase";

// TODO : add types here
export default function useFirebaseRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { storage, db, user } = useFirebase();

  const addRecipe = async (data: RecipeDetails) => {
    const id = v1();
    let recipePhoto: string = '';
    if (data.photo) {
      recipePhoto = (
        await addPhoto(data.photo, id)
      ).ref.fullPath;
    }
    const recipeData: Recipe = {
      details: {
        ...data,
        photo: recipePhoto
      },
      owner_id: user.uid,
      created_at: Timestamp.now(),
      id: id,
      searchable_title: data.title.toLowerCase()
    }
    return addDoc(collection(db, "recipes"), recipeData)
      .then(() => recipeData)
  };

  const addPhoto = async (uri: string, id: string) => {
    const photo = await (await fetch(uri.replace("file://", "file:"))).blob();
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

  const searchRecipes = (searchTerm: string) => {
    console.log("hook: ", searchTerm);
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
          console.error(error);
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
