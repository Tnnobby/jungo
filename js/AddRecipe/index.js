import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { initNewRecipe } from "../../redux/reducers/newRecipeReducer";
import useFirebaseRecipes from "../hooks/useFirebaseRecipes";
import { Header } from "../components/header";
import { useNavigation } from "../hooks/useNavigation";
import Page from "../Page";
import InstructionPage from "./InstructionPage";
import StartPage from "./StartPage";

const styles = StyleSheet.create({
  pageContainer: {
    position: "relative",
    flexGrow: 1,
  },
});

export default function AddRecipe(props) {
  // Pages: 'start', 'ingredients', 'instruction'
  const [page, setPage] = useState(0);
  const [pageState, setPageState] = useState("set");
  const { addRecipe } = useFirebaseRecipes();
  const recipe = useSelector((state) => state.edit_recipe);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { preheat, cooktime, preptime, nutrition_facts, title, photo } = recipe;

  const parse = (obj) => {
    let _returnObj = obj;
    return Object.keys(_returnObj).reduce((prev, key, index) => {
      try {
        prev[key] = JSON.parse(_returnObj[key]);
      } catch {
        prev[key] = _returnObj[key];
      }
      return prev;
    }, {});
  };

  const saveRecipe = () =>
    addRecipe({ details: parse(recipe) }).then(() =>
      console.log("added Recipe")
    );
  //addRecipe(recipe).then(() => console.log('Added Recipe'));

  useEffect(() => {
    dispatch(initNewRecipe());
  }, []);

  // To-do: Refractor this to eliminate unnecessary refreshes (Move useSelector into startpage, no need to refresh this level on every update.)
  const renderPage = (i) => {
    switch (i) {
      case 0:
        return (
          <StartPage
            nextPage={nextPage}
            {...{
              preheat,
              cooktime,
              preptime,
              nutrition_facts,
              title,
              photo,
            }}
          />
        );
      case 1:
        return <InstructionPage saveRecipe={saveRecipe} />;
      default:
        return;
    }
  };

  /**
   * @param {Promise<boolean>} promise returns a promise that resolves when transition animation is complete.
   */
  const nextPage = (promise) => {
    setPageState("next");
    promise.then(() => {
      console.log("promise_done");
      setPage(page + 1);
      setPageState("set");
    });
  };

  const handleTouch = () => Keyboard.dismiss();

  const backHandler = () => setPage(page - 1);

  return (
    <Page {...props}>
      <Pressable
        onPress={handleTouch}
        style={{ height: Dimensions.get("window").height }}
        onLayout={(event) =>
          console.log("Pressable:", event.nativeEvent.layout)
        }
      >
        <Header
          backButton={page > 0}
          onBackPress={backHandler}
          closeButton={true}
          headerText="Create Recipe"
        />
        <View style={styles.pageContainer}>{renderPage(page)}</View>
        {/* <View style={styles.pageContainer}>{pageState === 'next' && render(page + 1)}</View> */}
      </Pressable>
    </Page>
  );
}
